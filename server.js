/**
 * Created by Sahar-PC on 05/04/2017.
 */

var express = require ('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database');

// Configuration ====================================================================
//mongoose.connect(configDB.url);


// set up our express application
app.use(morgan('dev')); // log every request to the console.
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view-engine','ejs'); // set up ejs for templating.

app.use(session({secret: 'ilovesahar'})); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

 // Routes ========================================
 require('./app/routes.js');

 // launch
 app.listen(port);
 console.log('The magic happen on port ' + port);