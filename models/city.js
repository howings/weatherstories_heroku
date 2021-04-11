const mongoose = require('mongoose');
const Joi = require('joi');

const City = new mongoose.model('City', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
}));

function validateInputs(input) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(input);
}

exports. City = City;
exports.validateInputs = validateInputs;