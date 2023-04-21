const {trainValidator} = require('../validators');
const {ApiError} = require('../error');
const moment = require("moment/moment");
const {Train} = require("../models");


module.exports = {
    checkIsTrainExist: async (req, res, next) => {
        try {


            next();
        } catch (e) {
            next(e);
        }
    },

    // checkIsTrainExistsForUpdate: async (req, res, next) => {
    //     try {
    //
    //
    //         // req.train = train;
    //
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // },

    checkIsTrainExistsById: async (req, res, next) => {
        try {


            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsTrainExistsForUpdate: async (req, res, next) => {
        try {
            const { id } = req.params;

            const {from_city, to_city, date, departure_times} = req.body;

            if (!from_city || !to_city || !date || !departure_times) {
                return res.status(400).json({message: 'Some field not found'});
            }

            if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
                return res.status(400).json({message: 'Invalid date format'});
            }

            const validate = trainValidator.validate({
                from_city: req.body.from_city,
                to_city: req.body.to_city,
                date: req.body.date,
                departure_times: req.body.departure_times
            });

            if(validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            const [rowsUpdated] = await Train.update(req.body, {
                where: { id },
            });

            if (rowsUpdated === 0) {
                return res.status(404).json({ message: 'Train not found' });
            }

            const updatedTrain = await Train.findByPk(id);

            if (!updatedTrain) {
                return res.status(404).json({message: 'Train not updated'});
            }

            req.updatedTrain = updatedTrain;

            next();
        } catch (e) {
            next(e);
        }
    },
};
