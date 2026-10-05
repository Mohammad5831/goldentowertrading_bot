import { Sequelize } from "sequelize";
import config from "./env.js";

const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: "mysql",

    logging: false,

    define: {
      underscored: true,
      timestamps: true
    },

    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export default sequelize;