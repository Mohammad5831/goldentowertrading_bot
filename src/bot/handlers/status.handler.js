import {
  ContentPlan,
  Post
} from "../../database/index.js";

export async function statusHandler(ctx) {
  const latestPlan =
    await ContentPlan.findOne({
      order: [
        ["weekStart", "DESC"]
      ]
    });

  const scheduled =
    await Post.count({
      where: {
        status: "scheduled"
      }
    });

  const published =
    await Post.count({
      where: {
        status: "published"
      }
    });

  const failed =
    await Post.count({
      where: {
        status: "failed"
      }
    });

  const message = [
    "📊 وضعیت سیستم",
    "",
    `آخرین برنامه: ${
      latestPlan
        ? latestPlan.weekStart
        : "-"
    }`,
    `وضعیت برنامه: ${
      latestPlan
        ? latestPlan.status
        : "-"
    }`,
    "",
    `📝 زمان‌بندی‌شده: ${scheduled}`,
    `✅ منتشرشده: ${published}`,
    `❌ ناموفق: ${failed}`
  ].join("\n");

  await ctx.reply(message);
}