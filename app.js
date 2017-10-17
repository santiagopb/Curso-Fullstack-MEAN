var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const router = express.Router();

// Declare Routes
const customers = require('./routes/customers')(router);
const pets = require('./routes/pets')(router);
const vets = require('./routes/vets')(router);
const appointments = require('./routes/appointments')(router);

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/petStore', { useMongoClient: true });

//// Use Routes
app.use('/api', customers);
app.use('/api', pets);
app.use('/api', vets);
app.use('/api', appointments);


//Front End
app.all("*", (req, res) => {
res.sendFile(path.resolve("public/index.html"));
})

module.exports = app;
