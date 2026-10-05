import bot from "../../config/telegram.js";
import config from "../../config/env.js";

import { Post } from "../../database/index.js";

import logger from "../../utils/logger.js";

export async function publishPost(post) {
  try {
    await post.update({
      status: "publishing",
      error: null
    });

    let message;

    if (
      post.mediaType === "photo" &&
      post.mediaUrl
    ) {
      message = await bot.telegram.sendPhoto(
        config.telegram.channelId,
        post.mediaUrl,
        {
          caption: post.caption
        }
      );
    } else {
      message = await bot.telegram.sendMessage(
        config.telegram.channelId,
        post.caption
      );
    }

    await post.update({
      status: "published",
      publishedAt: new Date(),
      telegramMessageId: message.message_id,
      error: null
    });

    logger.info(
      {
        postId: post.id,
        messageId: message.message_id
      },
      "Post published"
    );

    return message;
  } catch (error) {
    await post.update({
      status: "failed",
      error: error.message
    });

    logger.error(
      {
        postId: post.id,
        error: error.message
      },
      "Post publishing failed"
    );

    throw error;
  }
}

export async function publishPendingPost(postId) {
  const post = await Post.findByPk(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.status !== "scheduled") {
    throw new Error(
      `Post cannot be published from status: ${post.status}`
    );
  }

  return publishPost(post);
}