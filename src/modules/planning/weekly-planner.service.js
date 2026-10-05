import {
  Op
} from "sequelize";

import {
  sequelize,
  BusinessProfile,
  ChannelProfile,
  ContentPlan,
  ContentGeneration,
  Post
} from "../../database/index.js";

import config from "../../config/env.js";

import goldenTowerApi from "../../integrations/goldentower/api.service.js";

import {
  generateWeeklyContent
} from "../../integrations/openai/openai.service.js";

import {
  validateWeeklyPlan
} from "../content/content.validator.js";

import {
  getRecentPosts
} from "../content/content.service.js";

import {
  getNextWeekRange,
  getPostSchedule
} from "../../utils/dates.js";

import logger from "../../utils/logger.js";

export async function generateWeeklyPlan() {
  const businessProfile =
    await BusinessProfile.findOne({
      where: {
        active: true
      }
    });

  if (!businessProfile) {
    throw new Error(
      "Active Business Profile not found"
    );
  }

  const channelProfile =
    await ChannelProfile.findOne({
      order: [["createdAt", "ASC"]]
    });

  if (!channelProfile) {
    throw new Error(
      "Channel Profile not found"
    );
  }

  const {
    weekStart,
    weekEnd
  } = getNextWeekRange();

  const existingPlan =
    await ContentPlan.findOne({
      where: {
        weekStart
      }
    });

  if (existingPlan) {
    logger.info(
      {
        weekStart,
        status: existingPlan.status
      },
      "Weekly plan already exists"
    );

    return existingPlan;
  }

  const generation =
    await ContentGeneration.create({
      model: config.openai.model,
      prompt: "",
      status: "processing"
    });

  try {
    const products =
      await goldenTowerApi.getProducts();

    const previousPosts =
      await getRecentPosts(50);

    const context = {
      businessProfile:
        businessProfile.toJSON(),

      channelProfile:
        channelProfile.toJSON(),

      products,

      previousPosts:
        previousPosts.map((post) =>
          post.toJSON()
        )
    };

    const generated =
      await generateWeeklyContent(context);

    validateWeeklyPlan(generated);

    const validProductIds = new Set(
      products
        .map((product) => {
          return String(
            product.id ??
            product.uuid ??
            product.productId ??
            ""
          );
        })
        .filter(Boolean)
    );

    for (const generatedPost of generated.posts) {
      if (
        generatedPost.productId &&
        !validProductIds.has(
          String(generatedPost.productId)
        )
      ) {
        generatedPost.productId = null;

        if (
          generatedPost.category === "product"
        ) {
          generatedPost.category =
            "educational";
        }
      }
    }

    const plan =
      await sequelize.transaction(
        async (transaction) => {
          const createdPlan =
            await ContentPlan.create(
              {
                weekStart,
                weekEnd,
                status: "generating",
                generationId: generation.id
              },
              {
                transaction
              }
            );

          for (
            let index = 0;
            index < generated.posts.length;
            index += 1
          ) {
            const generatedPost =
              generated.posts[index];

            const hashtags =
              Array.isArray(
                generatedPost.hashtags
              )
                ? generatedPost.hashtags
                : [];

            const hashtagText =
              hashtags.length
                ? `\n\n${hashtags.join(" ")}`
                : "";

            const caption =
              `${generatedPost.caption.trim()}${hashtagText}`;

            await Post.create(
              {
                contentPlanId:
                  createdPlan.id,

                type:
                  generatedPost.category,

                title:
                  generatedPost.title.trim(),

                caption,

                hashtags,

                mediaType: "none",

                mediaUrl: null,

                scheduledAt:
                  getPostSchedule(
                    weekStart,
                    index,
                    18,
                    0
                  ),

                status: "scheduled"
              },
              {
                transaction
              }
            );
          }

          await createdPlan.update(
            {
              status: "generated"
            },
            {
              transaction
            }
          );

          return createdPlan;
        }
      );

    await generation.update({
      prompt: JSON.stringify(
        context,
        null,
        2
      ),

      response: generated,

      status: "completed",

      error: null
    });

    logger.info(
      {
        planId: plan.id,
        weekStart
      },
      "Weekly content plan generated"
    );

    return plan;
  } catch (error) {
    await generation.update({
      status: "failed",
      error: error.message
    });

    logger.error(
      {
        error: error.message
      },
      "Weekly content generation failed"
    );

    throw error;
  }
}