const Company = require("../models").Company;

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
            rating : req.body.rating
          })
          .then(company => res.status(200).send(company))
          .catch(error => res.status(500).send(error));
  },
  getAll(req, res) {
    return Company
      .findAll()
      .then(companies => res.status(200).send(companies))
      .catch(error => res.status(500).send(error));
  },
  getById(req, res) {
    return Company
      .findById(req.params.company_id)
      .then(company => res.status(200).send(company))
      .catch(error => res.status(500).send(error));
  }
};
