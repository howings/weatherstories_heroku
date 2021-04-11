const mongoose = require('mongoose');
const config = require('config');
// const morgan = require('morgan'); // creates logs for the HTTP requests
const express = require('express');
const app = express();
const curl = require('curl');
const cors = require('cors');
require('dotenv').config();

// (only activate one) connect to the ONLINE mongoDB or.....
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wpqrm.mongodb.net/weatherstories?retryWrites=true&w=majority`;
mongoose.connect(process.env.MONGODB_URI || uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
    })
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.error('could not connect to MongoDB..', err))

// for Heroku
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!');
})


// import custom routes and middleware functions
const stories = require('./routes/stories');
const cities = require('./routes/cities');
const home = require('./routes/home');
// const logger = require('./middlewares/logger');
// const authenticate = require('./middlewares/authenticate');

// call and use middleware functions
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(express.static('public'));
app.use('/api/stories', stories);
app.use('/api/cities', cities);
app.use('/', home);
// app.use(logger); // this is a custom middleware function - comment out if no need
// app.use(authenticate); // this is a custom middleware function - comment out if no need


// Configuration
// console.log('Application Name: ' + config.get('name'));
// console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));

// if (app.get('env') === 'development') {
//     app.use(morgan('tiny'));
//     console.log('Morgan middleware enable...');
// }

// Ghibli Studio API connection test
// const url = 'https://ghibliapi.herokuapp.com/films';
// curl.getJSON(url, null, function(err, response, body) {
//     console.log(response.body);
// });

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// use an environment variable PORT in case of conflict 
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}...`));