const myDb = require("./models");
const company = require("./company.js");

myDb.company = company;

module.exports = myDb;
