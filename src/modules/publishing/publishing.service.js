import {
  Post
} from "../../database/index.js";

import {
  publishPost
} from "../../integrations/telegram/publisher.service.js";

import {
  getScheduledPosts
} from "../content/content.service.js";

import logger from "../../utils/logger.js";

export async function publishScheduledPosts() {
  const posts =
    await getScheduledPosts(5);

  if (!posts.length) {
    return {
      processed: 0,
      published: 0
    };
  }

  let published = 0;

  for (const post of posts) {
    try {
      await publishPost(post);

      published += 1;
    } catch (error) {
      logger.error(
        {
          postId: post.id,
          error: error.message
        },
        "Scheduled post failed"
      );
    }
  }

  return {
    processed: posts.length,
    published
  };
}

export async function retryPost(postId) {
  const post =
    await Post.findByPk(postId);

  if (!post) {
    throw new Error(
      "Post not found"
    );
  }

  if (post.status !== "failed") {
    throw new Error(
      "Only failed posts can be retried"
    );
  }

  await post.update({
    status: "scheduled",
    error: null
  });

  return publishPost(post);
}