const express = require("express");
    db = require('./db/models/'); // functions providing data from database, changed from ./db/, since only db is required
    bodyParser = require('body-parser');
    cookieParser = require('cookie-parser');
    session = require('express-session');
    passport = require('passport');

const _port = 8080;

const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(passport.initialize());
require("./config/passport.js");

require("./routes")(app); // request routing

console.log("starting server on port: " + _port);
app.listen(_port);
