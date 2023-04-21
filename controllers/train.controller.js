const {Sequelize} = require("sequelize");
const moment = require('moment');

const {Train} = require('../models');


module.exports = {
    getAll: async (req, res) => {
        try {
            const { from_city, to_city, date } = req.query;
            let startDate = moment().startOf('day');
            let endDate = moment().add(7, 'days').endOf('day');

            if (!from_city && !to_city) {
                const trains = await Train.findAll({
                    where: {
                        date: {
                            [Sequelize.Op.between]: [startDate.toDate(), endDate.toDate()],
                        },
                    },
                });
                return res.status(200).json(trains);
            }

            let whereClause = {};

            if (from_city) {
                whereClause.from_city = from_city;
            }
            if (to_city) {
                whereClause.to_city = to_city;
            }
            if (date) {
                if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
                    return res.status(400).json({message: 'Invalid date format'});
                }
                startDate = moment(date, 'YYYY-MM-DD').startOf('day');
                endDate = moment(date, 'YYYY-MM-DD').endOf('day');
            }

            const trains = await Train.findAll({
                where: {
                    ...whereClause,
                    date: {
                        [Sequelize.Op.between]: [startDate.toDate(), endDate.toDate()],
                    },
                },
            });

            res.status(200).json(trains);
        } catch (e) {
            res.status(500).json({message: 'Server error'});
        }
    },

    getById: async (req, res) => {
        const {id} = req.params;
        try {
            const train = await Train.findByPk(id);

            if (!train) {
                return res.status(404).json({message: 'Train not found'});
            }

            res.status(200).json(train);
        } catch (e) {
            res.status(500).json({message: 'Server error'});
        }
    },

    create: async (req, res) => {
        try {
            const {name, from_city, to_city, date} = req.body;

            if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
                return res.status(400).json({message: 'Invalid date format'});
            }

            const train = await Train.create({
                name,
                from_city,
                to_city,
                date,
            });

            res.status(201).json(train);
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    },

    update: async (req, res) => {
        try {
            const {id} = req.params;
            const {name, from_city, to_city, date} = req.body;

            if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
                return res.status(400).json({message: 'Invalid date format'});
            }

            const [updated] = await Train.update({
                name,
                from_city,
                to_city,
                date,
            }, {where: {id}});

            if (updated) {
                const updatedTrain = await Train.findByPk(id);

                return res.status(200).json(updatedTrain);
            } else {
                return res.status(404).json({message: 'Train not found'});
            }
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    },

    delete: async (req, res) => {
        const {id} = req.params;
        try {
            const train = await Train.findByPk(id);

            await train.destroy();

            res.status(200).json({message: 'Train deleted successfully'});
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    }
};

