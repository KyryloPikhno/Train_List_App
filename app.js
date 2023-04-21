const Sequelize = require('sequelize');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const {trainRoute} = require('./routes');
const {dbInit} = require('./configs');


const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    res.json('WELCOME');
});

app.use('/train', trainRoute);

dbInit.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
});

