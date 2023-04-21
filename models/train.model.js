const Sequelize = require('sequelize');

const {dbInit} = require('../configs');


const Train = dbInit.define('train', {
    from_city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    to_city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    departure_times: {
        type: Sequelize.ARRAY(Sequelize.TIME),
        allowNull: false
    }
});

module.exports = Train;
