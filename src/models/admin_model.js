const db = require("../database/db");
const sequelize = require("sequelize");


const Admins_model = db.define(
    'admins_table',
    {
        admin_id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        password: {
            type: sequelize.STRING,
            allowNull: false
        },
        first_name: {
            type: sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: sequelize.STRING,
            allowNull: false
        },
        email: {
            type: sequelize.STRING,
            allowNull: false,
            unique: true
        },
        phone_number: {
            type: sequelize.CHAR(10),
            allowNull: false
        }
    },
    {
        timestamps: false,
        // Disable timestamps (createdAt and updatedAt)
        freezeTableName: true
    });

module.exports = Admins_model;