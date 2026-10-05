import bot from "../../config/telegram.js";
import config from "../../config/env.js";

export async function getChannelInfo() {
  const chat = await bot.telegram.getChat(
    config.telegram.channelId
  );

  const memberCount =
    await bot.telegram.getChatMemberCount(
      config.telegram.channelId
    );

  return {
    id: chat.id,
    username: chat.username || null,
    title: chat.title || null,
    description: chat.description || null,
    memberCount
  };
}

export async function sendMessage(text, options = {}) {
  return bot.telegram.sendMessage(
    config.telegram.channelId,
    text,
    options
  );
}

export async function sendPhoto(
  photo,
  caption,
  options = {}
) {
  return bot.telegram.sendPhoto(
    config.telegram.channelId,
    photo,
    {
      caption,
      ...options
    }
  );
}

export default bot;