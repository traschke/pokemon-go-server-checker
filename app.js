/**
 * Created by Timo on 18.07.2016.
 */

var express = require('express');
var morgan = require('morgan');
var path = require('path');
var indexRoute = require('./routes/index');

var app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/status', indexRoute);

// Start the app
app.listen(3000, function (err) {
    if (err !== undefined) {
        debug('Error on startup, ', err)
    } else {
        console.log("Server started at Port 3000");
    }
});