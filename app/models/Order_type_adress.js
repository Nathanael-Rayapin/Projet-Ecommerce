const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');


const Order_type_adress = sequelize.define('order_type_adress',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
                isInt: true
            }
        },
        adress_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
                isInt: true
            }
        },
        adress_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
                isInt: true
            }
        },
    },
    {
        sequelize,
        tableName: 'order_type_adress',
        timestamps: false,
    }
)


module.exports = Order_type_adress;
