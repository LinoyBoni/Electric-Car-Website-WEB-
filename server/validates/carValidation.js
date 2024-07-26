const Joi = require('joi');

function newCarDataValidation(details) {
    const schema = Joi.object({
        Battery: Joi.number().required(),
        Company: Joi.string().required(),
        Car_name: Joi.string().required(),
        Car_name_link: Joi.string().uri().required(),
        Efficiency: Joi.number().required(),
        Fast_charge: Joi.number().required(),
        Price_DE: Joi.number().required(),
        Range: Joi.number().required(),
        Top_speed: Joi.number().required(),
        acceleration_0_100: Joi.number().required()
    });

    return schema.validate(details);
}

function updateCarDataValidation(details) {
    const schema = Joi.object({
        Battery: Joi.number(),
        Company: Joi.string(),
        Car_name: Joi.string(),
        Car_name_link: Joi.string().uri(),
        Efficiency: Joi.number(),
        Fast_charge: Joi.number(),
        Price_DE: Joi.number(),
        Range: Joi.number(),
        Top_speed: Joi.number(),
        acceleration_0_100: Joi.number()
    }).min(1);  // לפחות שדה אחד צריך להיות מעודכן

    return schema.validate(details);
}

module.exports = {
    newCarDataValidation,
    updateCarDataValidation
};
