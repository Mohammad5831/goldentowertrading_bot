export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable(
    "posts",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },

      content_plan_id: {
        type: Sequelize.UUID,
        allowNull: false
      },

      type: {
        type: Sequelize.ENUM(
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
        type: Sequelize.STRING,
        allowNull: false
      },

      caption: {
        type: Sequelize.TEXT("long"),
        allowNull: false
      },

      hashtags: {
        type: Sequelize.JSON,
        allowNull: false
      },

      media_type: {
        type: Sequelize.ENUM(
          "none",
          "photo",
          "video"
        ),
        allowNull: false,
        defaultValue: "none"
      },

      media_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      scheduled_at: {
        type: Sequelize.DATE,
        allowNull: true
      },

      published_at: {
        type: Sequelize.DATE,
        allowNull: true
      },

      telegram_message_id: {
        type: Sequelize.BIGINT,
        allowNull: true
      },

      status: {
        type: Sequelize.ENUM(
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
        type: Sequelize.TEXT,
        allowNull: true
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }
  );
}

export async function down(queryInterface) {
  await queryInterface.dropTable(
    "posts"
  );
}