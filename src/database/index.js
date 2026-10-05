import sequelize from "../config/database.js";

import BusinessProfile from "./models/BusinessProfile.js";
import ChannelProfile from "./models/ChannelProfile.js";
import ContentPlan from "./models/ContentPlan.js";
import ContentGeneration from "./models/ContentGeneration.js";
import Post from "./models/Post.js";

ContentPlan.hasMany(Post, {
  foreignKey: "contentPlanId",
  as: "posts",
  onDelete: "CASCADE"
});

Post.belongsTo(ContentPlan, {
  foreignKey: "contentPlanId",
  as: "plan"
});

ContentGeneration.hasOne(ContentPlan, {
  foreignKey: "generationId",
  as: "plan"
});

ContentPlan.belongsTo(ContentGeneration, {
  foreignKey: "generationId",
  as: "generation"
});

export {
  sequelize,
  BusinessProfile,
  ChannelProfile,
  ContentPlan,
  ContentGeneration,
  Post
};

export default sequelize;