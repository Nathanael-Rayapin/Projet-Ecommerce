const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');


const Role = sequelize.define('roles',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unicode: true,
            unique: true,
            validate: {
                is: /^[a-zA-Z ]+$/i,
            }
        },
    },
    {
        sequelize,
        updatedAt: false,
        tableName: 'roles',
    }
);

module.exports = Role;
