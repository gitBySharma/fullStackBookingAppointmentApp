const Sequelize = require('sequelize');

const sequelize = new Sequelize('bookingappointment', 'root', 'Sharma@mysql1133', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;