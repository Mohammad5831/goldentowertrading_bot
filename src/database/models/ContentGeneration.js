import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database.js";

class ContentGeneration extends Model {}

ContentGeneration.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    model: {
      type: DataTypes.STRING,
      allowNull: false
    },

    prompt: {
      type: DataTypes.TEXT("long"),
      allowNull: false
    },

    response: {
      type: DataTypes.JSON,
      allowNull: true
    },

    status: {
      type: DataTypes.ENUM(
        "processing",
        "completed",
        "failed"
      ),
      allowNull: false,
      defaultValue: "processing"
    },

    error: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: "ContentGeneration",
    tableName: "content_generations"
  }
);

export default ContentGeneration;