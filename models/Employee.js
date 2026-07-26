const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Employee = sequelize.define("Employee", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    employeeCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING
    },

    phone: {
        type: DataTypes.STRING
    },

    department: {
        type: DataTypes.STRING
    },

    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

});

module.exports = Employee;