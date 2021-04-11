const express = require('express');
const router = express.Router();

// send a message to the root of the app
router.get('/', (req, res) => {
    res.send('hello this is working again test 2');
});

module.exports = router;