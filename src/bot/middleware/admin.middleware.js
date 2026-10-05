import config from "../../config/env.js";

export async function adminMiddleware(
  ctx,
  next
) {
  const userId = ctx.from?.id;

  if (
    !userId ||
    Number(userId) !==
      Number(config.telegram.adminId)
  ) {
    await ctx.reply(
      "⛔ دسترسی غیرمجاز."
    );

    return;
  }

  await next();
}