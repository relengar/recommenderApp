const express = require("express");
    db = require('./db'); // functions providing data from database
    bodyParser = require('body-parser');

const _port = 8080;

const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

require("./routes")(app); // request routing
app.get("/companies/getAll", db.company.getAll);
app.get("/companies/getById", db.company.getById);

console.log("starting server on port: " + _port);
app.listen(_port);
