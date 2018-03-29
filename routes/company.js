const Company = require("../db/controllers").company;
const Category = require("../db/controllers").category;
const Pictures = require("../db/controllers").pictures;

module.exports = app => {
  //Category
  app.get("/category", Category.getAll);
  app.get("/category/:category_id", Category.getByName);

  //Company
  app.get("/company/all", Company.getAll);
  app.post("/company", Company.create);
  app.post("/company/:company_id", Company.update);
  app.delete("/company/delete/:company_id", Company.delete);
  app.delete('/company/deletePicture/:fileName', Company.deleteOnePic);
  app.delete('/company/deleteGallery/:company_id', (req, res) => {
    let comp = Company.getByIdMiddleware(req.params.company_id, ["ownerId"])
    .then(company => {
      if (company.ownerId === req.user.id) {
        Pictures.deleteGallery(req, res)
          .then(resp => res.status(200).send(resp))
          .catch(error => res.status(500).send(error));
      }
      else {
        res.status(401).send("You are not the owner of this company");
      }
    })
    .catch(error => res.status(500).send(error));
  });
  app.get("/company/query", Company.getByQuery);
  app.get("/company/search", (req, res) => {
    Company.getForFuzzySearch(req, res)
      .then(results => {res.status(200).send(results)})
      .catch(err => {res.status(500).send(err)});
  });
  app.get("/company/:company_id", Company.getById);
  app.get("/company/:company_id/picture/:picture_name", Pictures.getPicture);
};
