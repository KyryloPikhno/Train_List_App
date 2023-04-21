const {Train} = require('../models');


module.exports = {
    getAll: async (req, res) => {
        try {
            const trains = await Train.findAll();
            res.status(200).json(trains);
        } catch (error) {
            console.log(error);
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
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Server error'});
        }
    },

    create: async (req, res) => {
        try {
            const {name, departure_time, arrival_time} = req.body;
            const train = await Train.create({name, departure_time, arrival_time});
            res.status(201).json(train);
        } catch (error) {
            res.status(500).json({message: error.message});
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
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Server error'});
        }
    },

    delete: async (req, res) => {
        try {
            const {id} = req.params;
            const train = await Train.findByPk(id);
            await train.destroy();
            res.status(200).json({message: 'Train deleted successfully'});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
};
