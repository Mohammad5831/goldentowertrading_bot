import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database.js";

class ContentPlan extends Model {}

ContentPlan.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    weekStart: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true
    },

    weekEnd: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM(
        "generating",
        "generated",
        "active",
        "completed",
        "failed"
      ),
      allowNull: false,
      defaultValue: "generating"
    },

    generationId: {
      type: DataTypes.UUID,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: "ContentPlan",
    tableName: "content_plans"
  }
);

export default ContentPlan;