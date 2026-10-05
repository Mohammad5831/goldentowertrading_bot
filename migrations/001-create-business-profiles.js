export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable(
    "business_profiles",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      legal_name: {
        type: Sequelize.STRING,
        allowNull: true
      },

      industry: {
        type: Sequelize.STRING,
        allowNull: true
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      location: {
        type: Sequelize.STRING,
        allowNull: true
      },

      website: {
        type: Sequelize.STRING,
        allowNull: true
      },

      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },

      target_audience: {
        type: Sequelize.JSON,
        allowNull: false
      },

      products: {
        type: Sequelize.JSON,
        allowNull: false
      },

      services: {
        type: Sequelize.JSON,
        allowNull: false
      },

      strengths: {
        type: Sequelize.JSON,
        allowNull: false
      },

      values: {
        type: Sequelize.JSON,
        allowNull: false
      },

      tone: {
        type: Sequelize.JSON,
        allowNull: false
      },

      content_rules: {
        type: Sequelize.JSON,
        allowNull: false
      },

      forbidden_topics: {
        type: Sequelize.JSON,
        allowNull: false
      },

      cta: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      hashtags: {
        type: Sequelize.JSON,
        allowNull: false
      },

      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    "business_profiles"
  );
}