// server.js
//GITHUB TESTJÄVEL
// set up ======================================================================
// get all the tools we need
var express  = require('express');
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var fs 		 = require('fs');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

var app = express();

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
  secret: 'hakunamatata',
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// set the default tmpdir for uploads (IMPORTANT)
process.env.TMPDIR = './tmp';

//load all files in models dir
fs.readdirSync(__dirname + '/app/models').forEach(function(filename) {
    if (~filename.indexOf('js')) require(__dirname + '/app/models/' + filename)
});

// launch ======================================================================
app.listen(port);

