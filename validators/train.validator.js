const Joi = require('joi');


module.exports = {
    trainValidator: Joi.object({
        // from_city: Joi.string().required().min(2).max(30),
        // to_city: Joi.string().required().min(2).max(30),
        // date: Joi.string().required().min(8).max(11),
        // departure_times: Joi.array().items(Joi.string().required().min(5).max(5)).required()
        from_city: Joi.string(),
        to_city: Joi.string(),
        date: Joi.string(),
        departure_times: Joi.array()
    }),
};
