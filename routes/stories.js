const { Story, validate } = require('../models/story');
const express = require('express');
const router = express.Router();

// output information to a list with all story objects
router.get('/', async (req, res) => {
    const stories = await Story.find().sort('title');
    res.send(stories);
});

// output movieId by query input value
router.get('/search', async (req, res) => {
    let weatherTag = req.query.weather;

    const stories = await Story.find( {weatherTags: weatherTag} );
    res.send(stories);
});

// get a single object from the list by id
router.get('/:id', async (req, res) => {
    const story = await Story.findById(req.params.id);

    if (!story) return res.status(404).send('The story with the given ID was not found') // 404 object not found
    
    res.send(story);
});

// post a new story to the stories list
router.post('/', async (req, res) => {    
    // set an error catch for 400 bad request - missing or invalid input
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let story = new Story({ 
        title: req.body.title, 
        weatherTags: req.body.weatherTags,
        movieFileName: req.body.movieFileName,
        musicFileName: req.body.musicFileName
    });
    
    story = await story.save();    
    
    res.send(story)
});


// update a single story
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const story = await Story.findByIdAndUpdate(req.params.id, { 
        $set: {
            weatherTags: req.body.weatherTags,
            movieFileName: req.body.movieFileName,
            musicFileName: req.body.musicFileName
        } 
    }, { new: true })
    
    if (!story) return res.status(404).send('The story with the given ID was not found')

    res.send(story);
});


// delete a single story
router.delete('/:id', async (req, res) => {
    const story = await Story.findByIdAndRemove(req.params.id);
    
    if (!story) return res.status(404).send('The story with the given ID was not found')

    // return information of the deleted story
    res.send(story);
});


module.exports = router;