const express = require("express");
    db = require('./db/models/'); // functions providing data from database, changed from ./db/, since only db is required
    bodyParser = require('body-parser');
    cookieParser = require('cookie-parser');
    session = require('express-session');
    // MongoStore = require('connect-mongo')(session);
    passport = require('passport');

const _port = 8080;

const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'Tits',
  // store: new MongoStore({ url: 'mongodb://localhost/recommenderApp' })
  // setup a mongo db for this later
}));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport.js");

require("./routes")(app); // request routing

console.log("starting server on port: " + _port);
app.listen(_port);
