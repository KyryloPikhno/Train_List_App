const {Train} = require('../models');


module.exports = {
    getAll: async (req, res, next) => {
        try {
            res.status(200).json(req.trains);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res) => {
        try {
            res.status(200).json(req.train);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            res.status(201).json(req.train);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            res.status(200).json(req.updatedTrain);
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        const {id} = req.params;
        try {
            const train = await Train.findByPk(id);

            await train.destroy();

            res.status(200).json({message: 'Train deleted successfully'});
        } catch (e) {
            next(e);
        }
    }
};

