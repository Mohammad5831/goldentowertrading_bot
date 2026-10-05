import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database.js";

class BusinessProfile extends Model {}

BusinessProfile.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    legalName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    industry: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    targetAudience: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },

    products: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },

    services: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },

    strengths: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },

    values: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },

    tone: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },

    contentRules: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },

    forbiddenTopics: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },

    cta: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    hashtags: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },

    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "BusinessProfile",
    tableName: "business_profiles",
  }
);

export default BusinessProfile;