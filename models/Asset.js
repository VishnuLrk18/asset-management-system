const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Asset = sequelize.define("Asset", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    assetCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    assetName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    serialNumber: {
        type: DataTypes.STRING,
        unique: true
    },

    make: {
        type: DataTypes.STRING
    },

    model: {
        type: DataTypes.STRING
    },

    purchaseDate: {
        type: DataTypes.DATEONLY
    },

    purchaseCost: {
        type: DataTypes.DECIMAL(10, 2)
    },

    status: {
    type: DataTypes.STRING,
    defaultValue: "Available"
}

});

module.exports = Asset;