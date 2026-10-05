export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable(
    "content_plans",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },

      week_start: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        unique: true
      },

      week_end: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },

      status: {
        type: Sequelize.ENUM(
          "generating",
          "generated",
          "active",
          "completed",
          "failed"
        ),
        allowNull: false,
        defaultValue: "generating"
      },

      generation_id: {
        type: Sequelize.UUID,
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
    "content_plans"
  );
}