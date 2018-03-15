const queries = require('./queries.js');
const getters = require('./getters.js');
const setters = require('./setters.js');


module.exports = {
  create: setters.create,
  delete: setters.delete,
  update: setters.update,
  deleteOnePic: setters.deleteOnePic,

  getByQuery : queries.getByQuery,
  getForFuzzySearch : queries.getForFuzzySearch,

  getById : getters.getById,
  getByIdMiddleware : getters.getByIdMiddleware
};
