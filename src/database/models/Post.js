import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database.js";

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    contentPlanId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    type: {
      type: DataTypes.ENUM(
        "product",
        "educational",
        "commercial",
        "brand",
        "industry",
        "engagement"
      ),
      allowNull: false
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    caption: {
      type: DataTypes.TEXT("long"),
      allowNull: false
    },

    hashtags: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: []
    },

    mediaType: {
      type: DataTypes.ENUM(
        "none",
        "photo",
        "video"
      ),
      allowNull: false,
      defaultValue: "none"
    },

    mediaUrl: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    scheduledAt: {
      type: DataTypes.DATE,
      allowNull: true
    },

    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },

    telegramMessageId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },

    status: {
      type: DataTypes.ENUM(
        "draft",
        "scheduled",
        "publishing",
        "published",
        "failed",
        "cancelled"
      ),
      allowNull: false,
      defaultValue: "draft"
    },

    error: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "posts"
  }
);

export default Post;