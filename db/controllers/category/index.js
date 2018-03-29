const Category = require("../../models").Category;

module.exports = {
  getAll(req, res) {
    return Category.findAll()
    .then((categories) => {res.status(200).send(categories)})
    .catch((err) => {res.status(500).send(err)});
  },
  getByName(req, res) {
    return Category.findById(req.params.category_id)
    .then((category) => {
      return category.getCompany()
      .then((companies) => res.status(200).send(companies))
      .catch((err) => {res.status(500).send(err)});
    })
    .catch((err) => {res.status(500).send(err)});
  }
};
