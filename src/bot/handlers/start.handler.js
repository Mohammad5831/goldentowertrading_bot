export async function startHandler(ctx) {
  await ctx.reply(
    [
      "🤖 Golden Tower Content Bot",
      "",
      "دستورات موجود:",
      "",
      "/status - وضعیت سیستم",
      "/business - اطلاعات کسب‌وکار",
      "/plan - برنامه محتوایی",
      "/posts - آخرین پست‌ها"
    ].join("\n")
  );
}