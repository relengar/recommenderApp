const Company = require("../models").Company;
const Review = require("../models").Review;
const User = require("../models").User;
const Category = require("../models").Category;

module.exports = {
  create(req, res) {
        return Company
          .create({
            name : req.body.name,
            address : req.body.address,
            motto : req.body.motto,
            ico : req.body.ico,
            email : req.body.email,
            homepage : req.body.homepage,
            coordinates : req.body.coordinates,
            description : req.body.description,
            rating : 0,
            ratingHistory: [],
            ownerId: req.body.ownerId
          }, {transaction: req.transaction})
          .then(company => {
            return Category
            .findById(req.body.category)
              .then((category) => {
                company.addCategory(category);
                res.status(200).send({comp:company, cat:category});
              })
              .catch((err) => res.status(500).send(err));
            // res.status(200).send(company);
          })
          .catch(error => res.status(500).send(error));
  },
  getAll(req, res) {
    return Company
      .findAll({
        // limit: 10,
        order: [['createdAt', "DESC"]]
      })
      .then(companies => res.status(200).send(companies))
      .catch(error => res.status(500).send(error));
  },
  getById(req, res) {
    return Company
      .findById(req.params.company_id, {
        include: [{
          model: User,
          attributes: ['id', 'name'],
          as: "owner"
        }]
      })
      .then(company => res.status(200).send(company))
      .catch(error => res.status(500).send(error));
  }
};
