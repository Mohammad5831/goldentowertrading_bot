import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database.js";

class ChannelProfile extends Model {}

ChannelProfile.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    telegramChatId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    username: {
      type: DataTypes.STRING,
      allowNull: true
    },

    title: {
      type: DataTypes.STRING,
      allowNull: true
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    memberCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    language: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "fa"
    },

    contentStyle: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: []
    },

    targetAudience: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: []
    },

    postingFrequency: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 7
    }
  },
  {
    sequelize,
    modelName: "ChannelProfile",
    tableName: "channel_profiles"
  }
);

export default ChannelProfile;