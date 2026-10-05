const allowedCategories = new Set([
  "product",
  "educational",
  "commercial",
  "brand",
  "industry",
  "engagement"
]);

export function validatePost(post) {
  if (!post) {
    throw new Error("Post is empty");
  }

  if (
    typeof post.title !== "string" ||
    !post.title.trim()
  ) {
    throw new Error("Post title is required");
  }

  if (
    typeof post.caption !== "string" ||
    !post.caption.trim()
  ) {
    throw new Error("Post caption is required");
  }

  if (!allowedCategories.has(post.category)) {
    throw new Error(
      `Invalid post category: ${post.category}`
    );
  }

  if (!Array.isArray(post.hashtags)) {
    throw new Error(
      "Post hashtags must be an array"
    );
  }

  if (
    post.productId !== null &&
    typeof post.productId !== "string"
  ) {
    throw new Error(
      "productId must be string or null"
    );
  }

  return true;
}

export function validateWeeklyPlan(plan) {
  if (!plan) {
    throw new Error(
      "Generated weekly plan is empty"
    );
  }

  if (!Array.isArray(plan.posts)) {
    throw new Error(
      "Generated plan does not contain posts"
    );
  }

  if (plan.posts.length !== 7) {
    throw new Error(
      `Weekly plan must contain 7 posts. Received: ${plan.posts.length}`
    );
  }

  for (const post of plan.posts) {
    validatePost(post);
  }

  return true;
}