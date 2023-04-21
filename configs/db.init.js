const Sequelize = require('sequelize');

const dbConfig = require('./db.config');


const dbInit = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    dialect: 'mysql',
    host: dbConfig.host,
    port: dbConfig.port
});

module.exports = dbInit;
