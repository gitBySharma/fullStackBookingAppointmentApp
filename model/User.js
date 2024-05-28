const {Sequelize} = require('sequelize');

const sequelize = require('../util/database.js');

const User = sequelize.define('userData',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emailId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    phoneNumber: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        unique: true,
    }
});

module.exports = User;