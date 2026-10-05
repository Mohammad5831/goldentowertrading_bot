import {
  Post
} from "../../database/index.js";

import {
  formatDateTime
} from "../../utils/dates.js";

export async function postsHandler(ctx) {
  const posts =
    await Post.findAll({
      order: [
        ["createdAt", "DESC"]
      ],

      limit: 10
    });

  if (!posts.length) {
    await ctx.reply(
      "❌ هنوز پستی ثبت نشده است."
    );

    return;
  }

  const lines = [
    "📝 آخرین پست‌ها",
    ""
  ];

  posts.forEach(
    (post, index) => {
      lines.push(
        `${index + 1}. ${post.title}`,
        `نوع: ${post.type}`,
        `وضعیت: ${post.status}`,
        `زمان: ${formatDateTime(
          post.scheduledAt
        )}`,
        ""
      );
    }
  );

  await ctx.reply(
    lines.join("\n")
  );
}