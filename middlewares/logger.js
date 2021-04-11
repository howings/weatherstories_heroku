function log(req, res, next) { // this is a custom middleware function which gets executed in sequence by the app
    console.log('logging.....');
    next();
}

module.exports = log;