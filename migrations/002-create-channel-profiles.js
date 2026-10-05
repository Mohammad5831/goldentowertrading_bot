export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable(
    "channel_profiles",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },

      telegram_chat_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      username: {
        type: Sequelize.STRING,
        allowNull: true
      },

      title: {
        type: Sequelize.STRING,
        allowNull: true
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      member_count: {
        type: Sequelize.INTEGER,
        allowNull: true
      },

      language: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "fa"
      },

      content_style: {
        type: Sequelize.JSON,
        allowNull: false
      },

      target_audience: {
        type: Sequelize.JSON,
        allowNull: false
      },

      posting_frequency: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 7
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
    "channel_profiles"
  );
}