const moment = require("moment/moment");

const {trainRepository} = require("../repository");
const {validator} = require('../validators');
const {ApiError} = require('../error');
const {dateEnum} = require("../enum");
const {Train} = require("../models");


module.exports = {
    checkIsTrainExists: async (req, res, next) => {
        try {
            const trains = await trainRepository.find(req.query);

            if(!trains){
                throw new ApiError('Trains not found', 404);
            }

            req.trains = trains;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsIsBodyValid: async (req, res, next) => {
        try {
            const {name, from_city, to_city, date} = req.body.train;

            const { error } = validator.trainValidator.validate({ name, from_city, to_city, date });

            if (error) {
                throw new ApiError(error.details[0].message, 400);
            }

            if (!moment(date, dateEnum.DATE_FORMAT, true).isValid()) {
                throw new ApiError('Invalid date format', 400);
            }

            const train = await Train.create({
                name,
                from_city,
                to_city,
                date,
            });

            if (!train) {
                throw new ApiError('Train is not created', 400);
            }

            req.train = train;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsTrainExistsById: async (req, res, next) => {
        const {id} = req.params;
        try {
            const train = await Train.findByPk(id);

            if (!train) {
                throw new ApiError('Train not found', 400);
            }

            req.train = train;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsTrainExistsForUpdate: async (req, res, next) => {
        try {
            const {id} = req.params;

            const {name, from_city, to_city, date} = req.body.train;

            const { error } = validator.trainValidator.validate({ name, from_city, to_city, date });

            if (error) {
                throw new ApiError(error.details[0].message, 400);
            }

            if (!moment(date, dateEnum.DATE_FORMAT, true).isValid()) {
                throw new ApiError('Invalid date format', 400);
            }

            const [updated] = await Train.update({
                name,
                from_city,
                to_city,
                date,
            }, {where: {id}});

            if (!updated) {
                throw new ApiError('Train is not updated', 400);
            }

            req.updatedTrain = await Train.findByPk(id);

            next();
        } catch (e) {
            next(e);
        }
    },
};
