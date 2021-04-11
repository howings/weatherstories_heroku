const mongoose = require('mongoose');
const Joi = require('joi');

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        // has to match with Ghibli API's movie name
        required: true
    },
    weatherTags: { 
        type: String,
        // match with weather API return weather status (Rainy, Sunny, Windy, Snowy, Foggy, Wild)
        // enum: ['Rain', 'clear', 'wind', 'snow', 'foggy', 'wild'],
        // trim: true
    }, 
    movieFileName: {
        type: String,
        required:true
    },
    musicFileName: String
});

function validate(input) {
    const schema = Joi.object({
        title: Joi.string().min(3),
        weatherTags: Joi.string().min(3),
        movieFileName: Joi.string().min(5),
        musicFileName: Joi.string().min(5)
    });

    return schema.validate(input);
}

const Story = new mongoose.model('Story', storySchema);

exports.Story = Story;
exports.validate = validate;

