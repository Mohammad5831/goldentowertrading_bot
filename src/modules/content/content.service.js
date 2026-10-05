import {
  Post,
  ContentPlan
} from "../../database/index.js";

import {
  Op
} from "sequelize";

export async function getRecentPosts(limit = 50) {
  return Post.findAll({
    attributes: [
      "id",
      "title",
      "caption",
      "type",
      "scheduledAt",
      "publishedAt",
      "status"
    ],

    order: [
      ["createdAt", "DESC"]
    ],

    limit
  });
}

export async function getScheduledPosts(limit = 5) {
  return Post.findAll({
    where: {
      status: "scheduled",

      scheduledAt: {
        [Op.lte]: new Date()
      }
    },

    order: [
      ["scheduledAt", "ASC"]
    ],

    limit
  });
}

export async function getPostsForPlan(planId) {
  return Post.findAll({
    where: {
      contentPlanId: planId
    },

    order: [
      ["scheduledAt", "ASC"]
    ]
  });
}

export async function getLatestPlan() {
  return ContentPlan.findOne({
    order: [
      ["weekStart", "DESC"]
    ]
  });
}