const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');


const Product = sequelize.define('products',
    {
        ref: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                // 3 chiffre suivis de 5 lettres majuscules
                is: /^\d{3}[A-Z]{5}/i,
                max: 8
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                is: /^[a-zA-Z0-9Ã-ÿ '"°-]+$/i,
                min: 3,
                max: 30
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate:{
                is: /^[a-zA-Z0-9Ã-ÿ '"°-]+$/i,
                min: 15,
                max: 200
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                is: /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpe?g|png)$/i,
            }
        },
        priceHT: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                is: /(^\d+$)|(^\d+\.\d$)|(^\d+\.\d\d$)$/i,
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        updatedAt: false,
        tableName: 'products',
    }
);

module.exports = Product;
