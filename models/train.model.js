const Sequelize = require('sequelize');

const {dbInit} = require('../configs');


const Train = dbInit.define('trains', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
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
}, {
    underscored: true
});

module.exports = Train;
