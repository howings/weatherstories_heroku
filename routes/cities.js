const { City, validateInputs } = require('../models/city');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

// output information to a list with all history objects
router.get('/', async (req, res) => {
    const cities = await City.find().sort('-_id');
    res.send(cities);
});

// post a new city entry to the cities list
router.post('/', async (req, res) => {
    // set an error catch for 400 bad request - missing or invalid input
    const { error } = validateInputs(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // post the new city input in the cities list
    let city = new City({ name: req.body.name });
    city = await city.save();
    res.send(city)
});

module.exports = router;