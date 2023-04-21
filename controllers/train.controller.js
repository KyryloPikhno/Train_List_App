const {Train} = require('../models');

const moment = require('moment');


module.exports = {
    getAll: async (req, res) => {
        try {
            const trains = await Train.findAll();

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
            const {from_city, to_city, date, departure_times} = req.body;

            if (!from_city || !to_city || !date || !departure_times) {
                return res.status(400).json({message: 'Some field not found'});
            }

            if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
                return res.status(400).json({message: 'Invalid date format'});
            }

            const train = await Train.create({
                from_city,
                to_city,
                date,
                departure_times
            })

            res.status(201).json(train);
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    },

    update: async (req, res, next) => {
        try {
            res.status(200).json(req.updatedTrain);
        } catch (e) {
            next(e);
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

