const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {tableName: 'productos'}
);

// Definir la relación
Product.belongsTo(Category, { foreignKey: 'CategoryId', onDelete: 'CASCADE' });
Category.hasMany(Product, { foreignKey: 'CategoryId' });

module.exports = Product;
