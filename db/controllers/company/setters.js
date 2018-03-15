const Company = require("../../models").Company;
const Pictures = require("../pictures");
const helpers = require('./helpers.js');

// let getBorderLatLon = (lat, lon, radius) => {
//   let result = {maxLat: NaN, minLat: NaN, maxLon: NaN, minLon: NaN};
//   let latDistVal = (radius / latDistanceInM);
//   let lonDistVal = (radius / lonDistanceInM);
//   result.maxLat = lat + (latDistVal);
//   result.minLat = lat - (latDistVal);
//   result.maxLon = lon + (lonDistVal);
//   result.minLon = lon - (lonDistVal);
//   return result;
// }

module.exports = {
  create(req, res) {
    let borderCoords = helpers.getBorderLatLon(parseFloat(req.body.coordsLat), parseFloat(req.body.coordsLon), parseFloat(req.body.coordsRad));
    return Company
      .create({
        name : req.body.name,
        address : req.body.address,
        motto : req.body.motto,
        ico : req.body.ico,
        email : req.body.email,
        homepage : req.body.homepage,
        coordsMaxLat: borderCoords.maxLat,
        coordsMinLat: borderCoords.minLat,
        coordsMaxLon: borderCoords.maxLon,
        coordsMinLon: borderCoords.minLon,
        coordsLat : req.body.coordsLat,
        coordsLon : req.body.coordsLon,
        coordsRad : req.body.coordsRad,
        description : req.body.description,
        rating : 0,
        ratingHistory: [],
        ownerId: req.user.id
      }, {transaction: req.transcation})
      .then(company => {
        return Category
        .findById(req.body.category)
          .then(category => {
            company.addCategory(category)
            .then(resp => {console.log(resp)})
            .catch(err => {console.log(err)});
            Pictures.saveGallery(req, res, company)
            .then(company => {
              res.status(200).send({comp:company, cat:category});
            });
          })
          .catch(err => res.status(500).send(err));
      })
      .catch(error => res.status(500).send(error));
  },
  delete(req, res) {
    if (!req.isAuthenticated()) {
      res.status(401).send("Unauthorized");
    }
    else {
      !req.params.company_id ? res.status(400).send("Missing company ID paramter") : null;
      Company.findById(req.params.company_id)
        .then(company => {
          if (req.user.id !== company.ownerId) {
            res.status(401).send("Unauthorized");
          }
          else {
            Pictures.deleteGallery(req, res)
              .then(resp => {
                company.destroy({ force: true })
                res.status(200).send("Company deleted successfully");
              })
            .catch(error => res.status(500).send(error));
          }
        })
        .catch(error => res.status(500).send(error));
    }
  },
  update(req, res) {
    return Company
      .findById(req.params.company_id)
      .then(company => {
        if (!req.isAuthenticated() || (req.user.id !== company.ownerId)) {
          res.status(403).send("You are not owner of this company");
        }
        else {
          company.address = req.body.address;
          company.description = req.body.description;
          company.motto = req.body.motto;
          company.ico = req.body.ico;
          company.email = req.body.email;
          company.homepage = req.body.homepage;
          company.save()
            .then(resp => {
              Pictures.saveGallery(req, res, company)
              .then(resp => res.status(200).send(company));
            })
            .catch(error => res.status(500).send(error));
        }
      })
      .catch(error => res.status(500).send(error));
  },
  deleteOnePic(req, res) {
    return Company
      .findById(req.query.id)
        .then(company => {
          if (!req.isAuthenticated() || req.user.id !== company.ownerId) {
            res.status(403).send("Unauthorized");
          }
          else {
            Pictures.deletePicture(req, res)
              .then(resp => res.status(200).send(req.params.fileName+" deleted"))
              .catch(error => res.status(500).send(error));
          }
        })
        .catch(error => res.status(500).send(error));
  },
};
