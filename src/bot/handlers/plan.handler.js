import {
  ContentPlan,
  Post
} from "../../database/index.js";

import {
  formatDateTime
} from "../../utils/dates.js";

export async function planHandler(ctx) {
  const plan =
    await ContentPlan.findOne({
      order: [
        ["weekStart", "DESC"]
      ]
    });

  if (!plan) {
    await ctx.reply(
      "❌ هنوز هیچ برنامه‌ای ایجاد نشده است."
    );

    return;
  }

  const posts =
    await Post.findAll({
      where: {
        contentPlanId: plan.id
      },

      order: [
        ["scheduledAt", "ASC"]
      ]
    });

  const lines = [
    "📅 برنامه محتوایی",
    "",
    `هفته: ${plan.weekStart} تا ${plan.weekEnd}`,
    `وضعیت: ${plan.status}`,
    ""
  ];

  posts.forEach(
    (post, index) => {
      lines.push(
        `${index + 1}. ${post.title}`,
        `   نوع: ${post.type}`,
        `   زمان: ${formatDateTime(
          post.scheduledAt
        )}`,
        `   وضعیت: ${post.status}`,
        ""
      );
    }
  );

  await ctx.reply(
    lines.join("\n")
  );
}