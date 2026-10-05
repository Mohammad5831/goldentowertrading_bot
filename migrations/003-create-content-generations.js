export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable(
    "content_generations",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },

      model: {
        type: Sequelize.STRING,
        allowNull: false
      },

      prompt: {
        type: Sequelize.TEXT("long"),
        allowNull: false
      },

      response: {
        type: Sequelize.JSON,
        allowNull: true
      },

      status: {
        type: Sequelize.ENUM(
          "processing",
          "completed",
          "failed"
        ),
        allowNull: false,
        defaultValue: "processing"
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
    "content_generations"
  );
}