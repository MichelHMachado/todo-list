const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging: false,
  }
);

async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados foi bem-sucedida!");
  } catch (error) {
    console.error("Erro de conexão com o banco de dados:", error);
  }
}

authenticate();

module.exports = sequelize;
