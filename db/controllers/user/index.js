const getters = require("./getters.js");
const setters = require("./setters.js");

module.exports = {
  create: setters.create,
  update: setters.update,
  delete: setters.delete,

  getUser: getters.getUser,
  getByName: getters.getByName,
  getById: getters.getById,
  getForQuery: getters.getForQuery
};
