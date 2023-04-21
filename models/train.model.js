const Sequelize = require('sequelize');

const {dbInit} = require('../configs');


const Train = dbInit.define('train', {
    name: Sequelize.STRING,
    departure_time: Sequelize.TIME,
    arrival_time: Sequelize.TIME
});

module.exports = Train;
