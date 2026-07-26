const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "asset_management",
    "postgres",
    "Rvslrk",
    {
        host: "localhost",
        dialect: "postgres",
        port: 5432,
        logging: false
    }
);

module.exports = sequelize;