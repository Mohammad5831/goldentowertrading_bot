import {
  getProfile
} from "../../modules/business/business-profile.service.js";

export async function businessHandler(ctx) {
  const profile =
    await getProfile();

  if (!profile) {
    await ctx.reply(
      "❌ Business Profile وجود ندارد."
    );

    return;
  }

  const message = [
    `🏢 ${profile.name}`,
    "",
    `صنعت: ${profile.industry || "-"}`,
    `موقعیت: ${profile.location || "-"}`,
    `وب‌سایت: ${profile.website || "-"}`,
    "",
    "مخاطبان:",
    ...(profile.targetAudience || [])
      .map((item) => `• ${item}`),
    "",
    "لحن:",
    ...(profile.tone || [])
      .map((item) => `• ${item}`)
  ].join("\n");

  await ctx.reply(message);
}