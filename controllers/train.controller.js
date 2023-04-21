const {Train} = require('../models');


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
            const {name, from_city, to_city, date, departure_times} = req.body;

            if (!name || !from_city || !to_city || !date || !departure_times) {
                return res.status(400).json({message: 'Some field not found'});
            }

            const train = await Train.create({
                name,
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

    update: async (req, res) => {
        const {id} = req.params;
        try {
            const [rowsUpdated, [updatedTrain]] = await Train.update(req.body, {
                where: {id},
                returning: true
            });

            if (!rowsUpdated) {
                return res.status(404).json({message: 'Train not found'});
            }

            res.status(200).json(updatedTrain);
        } catch (e) {
            res.status(500).json({message: 'Server error'});
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

