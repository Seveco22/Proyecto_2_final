const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Proyecto_Final_Tienda', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

module.exports = sequelize;
