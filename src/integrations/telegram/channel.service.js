import {
  ChannelProfile
} from "../../database/index.js";

import {
  getChannelInfo
} from "./telegram.service.js";

import logger from "../../utils/logger.js";

export async function syncChannelProfile() {
  const channel = await getChannelInfo();

  const [profile] = await ChannelProfile.findOrCreate({
    where: {
      telegramChatId: String(channel.id)
    },

    defaults: {
      telegramChatId: String(channel.id),
      username: channel.username,
      title: channel.title,
      description: channel.description,
      memberCount: channel.memberCount,
      language: "fa",
      postingFrequency: 7,
      contentStyle: [
        "professional",
        "informative",
        "commercial"
      ],
      targetAudience: [
        "customers",
        "builders",
        "contractors",
        "architects"
      ]
    }
  });

  await profile.update({
    username: channel.username,
    title: channel.title,
    description: channel.description,
    memberCount: channel.memberCount
  });

  logger.info(
    {
      channelId: channel.id,
      title: channel.title
    },
    "Telegram channel synchronized"
  );

  return profile;
}

export async function getChannelProfile() {
  return ChannelProfile.findOne({
    order: [["createdAt", "ASC"]]
  });
}