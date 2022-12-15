const Sequelize = require("sequelize");
require("dotenv").config({ path: "development.env" });

const dataBase = new Sequelize(
  process.env.BD_NAME,
  process.env.BD_USER,
  process.env.BD_PASS,
  {
    host: process.env.BD_HOST,
    dialect: "mysql",
    port: process.env.BD_PORT,
    timezone: "-03:00",
  }
);

module.exports = dataBase;
