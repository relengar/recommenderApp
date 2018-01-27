const express = require("express");
    // express_ws = require('express-ws');
    db = require('./db/models/'); // functions providing data from database, changed from ./db/, since only db is required
    bodyParser = require('body-parser');
    session = require('express-session'); // use to set up passport serialize user - authenticate requests
    passport = require('passport');
    MongoStore = require('connect-mongo')(session);
    fileUpload = require('express-fileupload');
    fs = require("fs");
    env = process.env.NODE_ENV || 'development';
    config = require("./config.json")[env]["app"];

const sessionSettings = {
  secret: config.sessionSecret,//"bwahaha",
  resave: false,
  saveUninitialized: false,
  // cookie: {secure: false},
};
if (env !== 'development' && config.mongoUrlForSession && config.mongoUrlForSession !== "") {
  sessionSettings.store = new MongoStore({url: config.mongoUrlForSession});
}
const _port = config.port//8080;

const app = express();
app.use(express.static('public'));
app.use(fileUpload({
  limits: {
    files: 20,
    fileSize: 5 * 1024 * 1024
  }
}));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session(sessionSettings));
app.use(passport.initialize());
app.use(passport.session());


require("./passport/passport.js");
const expressWs = require('express-ws')(app);
require("./routes")(app, expressWs); // request routing
console.log("starting server on port: " + _port);
app.listen(_port);
