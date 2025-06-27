import { DataTypes } from "sequelize";
import sequelize from "../db/conecction";

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
