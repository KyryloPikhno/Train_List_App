require('dotenv').config();


module.exports = {
    username: process.env.USERNAME || 'test',
    password: process.env.PASSWORD || 'test',
    database: process.env.DATABASE || 'test',
    host: process.env.HOST || 'test',
    port: process.env.DB_PORT|| 3306
};
