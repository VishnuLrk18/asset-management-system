const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AssetReturn = sequelize.define("AssetReturn", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    issueId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    returnDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    remarks: {
        type: DataTypes.STRING
    }

});

module.exports = AssetReturn;