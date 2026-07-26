const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AssetIssue = sequelize.define("AssetIssue", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    assetId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    issueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    expectedReturnDate: {
        type: DataTypes.DATEONLY
    },

    remarks: {
        type: DataTypes.STRING
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: "Issued"
    }

});

module.exports = AssetIssue;