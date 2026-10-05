import OpenAI from "openai";

import config from "../../config/env.js";
import logger from "../../utils/logger.js";

import {
  buildSystemPrompt,
  buildUserPrompt
} from "./prompts.js";

const client = new OpenAI({
  apiKey: config.openai.apiKey
});

const weeklyContentSchema = {
  type: "object",

  additionalProperties: false,

  properties: {
    posts: {
      type: "array",

      minItems: 7,
      maxItems: 7,

      items: {
        type: "object",

        additionalProperties: false,

        properties: {
          day: {
            type: "integer",
            minimum: 1,
            maximum: 7
          },

          title: {
            type: "string"
          },

          caption: {
            type: "string"
          },

          category: {
            type: "string",

            enum: [
              "product",
              "educational",
              "commercial",
              "brand",
              "industry",
              "engagement"
            ]
          },

          productId: {
            type: ["string", "null"]
          },

          hashtags: {
            type: "array",

            items: {
              type: "string"
            }
          },

          mediaSuggestion: {
            type: "string"
          }
        },

        required: [
          "day",
          "title",
          "caption",
          "category",
          "productId",
          "hashtags",
          "mediaSuggestion"
        ]
      }
    }
  },

  required: ["posts"]
};

export async function generateWeeklyContent({
  businessProfile,
  channelProfile,
  products,
  previousPosts
}) {
  const systemPrompt = buildSystemPrompt();

  const userPrompt = buildUserPrompt({
    businessProfile,
    channelProfile,
    products,
    previousPosts
  });

  const response = await client.responses.create({
    model: config.openai.model,

    instructions: systemPrompt,

    input: userPrompt,

    text: {
      format: {
        type: "json_schema",
        name: "weekly_content_plan",
        strict: true,
        schema: weeklyContentSchema
      }
    }
  });

  const output = response.output_text;

  if (!output) {
    throw new Error(
      "OpenAI returned an empty response"
    );
  }

  let parsed;

  try {
    parsed = JSON.parse(output);
  } catch {
    logger.error(
      { output },
      "OpenAI returned invalid JSON"
    );

    throw new Error(
      "OpenAI response could not be parsed as JSON"
    );
  }

  return parsed;
}