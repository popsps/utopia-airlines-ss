const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  dialectOptions: {
    decimalNumbers: true,
  },
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

module.exports = { sequelize };