const Joi = require('joi');


module.exports = {
    trainValidator: Joi.object({
        name: Joi.string().required().min(2).max(20),
        from_city: Joi.string().required().min(2).max(20),
        to_city: Joi.string().required().min(2).max(20),
        date: Joi.date().required(),
    }),
};
