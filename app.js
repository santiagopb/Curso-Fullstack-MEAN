const express = require('express');
const socket_io = require('socket.io');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const io = socket_io();

app.io = io;

const router = express.Router();

// Declare Routes
require('./connection/socket')(io);
const customers = require('./routes/customers')(router, io);
const pets = require('./routes/pets')(router, io);
const vets = require('./routes/vets')(router, io);
const appointments = require('./routes/appointments')(router, io);


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'images', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Database Conection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURI || 'mongodb://localhost/petStore',  { useMongoClient: true });

// Use Routes
app.use('/api', customers);
app.use('/api', pets);
app.use('/api', vets);
app.use('/api', appointments);


//Front End
app.all("*", (req, res) => {
res.sendFile(path.resolve("public/index.html"));
})

module.exports = app;
