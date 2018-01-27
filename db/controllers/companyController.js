const Company = require("../models").Company;
const Review = require("../models").Review;
const User = require("../models").User;
const Category = require("../models").Category;
const Pictures = require("./picturesController.js");
const Op = db.Sequelize.Op;

let prepareQuery = (req) => {
  let ownerIDs = req.query.ownerId ? [].concat(JSON.parse(req.query.ownerId)) : [];
  let categories = req.query.categories ? [].concat(JSON.parse(req.query.categories)) : [];
  let params = ["name", "motto", "ico", "email", "homepage"];
  let attributes = [];
  let tempParam;
  let query = {
    [Op.and]: []
  };
  if (req.query.geoQuery && req.query.geoQuery === "true") {
    query[Op.and].push({"coordsMaxLat": {[Op.gt]: req.query.lat}});
    query[Op.and].push({"coordsMinLat": {[Op.lt]: req.query.lat}});
    query[Op.and].push({"coordsMaxLon": {[Op.gt]: req.query.lon}});
    query[Op.and].push({"coordsMinLon": {[Op.lt]: req.query.lon}});
  }
  params.forEach((param) => {
    if (req.query[param]) {
      tempParam = {};
      tempParam[param] = {[Op.iLike] : '%'+req.query[param]+'%'};
      query[Op.and].push(tempParam);
    }
  });
  isNaN(parseInt(req.query.rating)) ? null : query.rating = req.query.rating;
  ownerIDs.length === 0 ? null : query.ownerId = {[Op.in]: ownerIDs};
  query[Op.and].length > 0 ? null : delete query[Op.and];
  return {where: query};
};

let queryCompaniesPerCategory = async (req, res, categories) => {
  let query = prepareQuery(req);
  let temp, resp = [];
  for (let i = 0; i < categories.length; i++) {
    temp = await categories[i].getCompany(query);
    resp = resp.concat(temp);
  }
  if (req.query.geoQuery && req.query.geoQuery === "true") {
    resp = resp.filter(company => computeGeoDistance(req.query.lat, req.query.lon, company.coordsLat, company.coordsLon) <= company.coordsRad);
  }
  res.status(200).send(resp);
};

// let deg2rad = (val) => {
//   return val * Math.PI/180;
// };
//
// let computeGeoDistance(lat1, lon2, lat2, lon2) => {
//   const R = 6371e3; //earth radius in m
//   let dLat = deg2rad(lat2-lat1);
//   let dLon = deg2rad(lon2-lon1);
//   let a =
//     Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//     Math.sin(dLon/2) * Math.sin(dLon/2);
//   let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//   return d = R * c; // Distance in m
// };

const latDistanceInM = 111.19 * 1000;
const lonDistanceInM = 74.23 * 1000;

let computeGeoDistance = (lat1, lon1, lat2, lon2) => {
  const p = 0.017453292519943295;    // Math.PI / 180
  let a = 0.5 - Math.cos((lat2 - lat1) * p)/2 +
          Math.cos(lat1 * p) * Math.cos(lat2 * p) *
          (1 - Math.cos((lon2 - lon1) * p))/2;

  let debug = 12742000 * Math.asin(Math.sqrt(a));
  return 12742000 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371e3 m
};

let getBorderLatLon = (lat, lon, radius) => {
  let result = {maxLat: NaN, minLat: NaN, maxLon: NaN, minLon: NaN};
  let latDistVal = (radius / latDistanceInM);
  let lonDistVal = (radius / lonDistanceInM);
  result.maxLat = lat + (latDistVal);
  result.minLat = lat - (latDistVal);
  result.maxLon = lon + (lonDistVal);
  result.minLon = lon - (lonDistVal);
  return result;
}

module.exports = {
  create(req, res) {
    let borderCoords = getBorderLatLon(parseFloat(req.body.coordsLat), parseFloat(req.body.coordsLon), parseFloat(req.body.coordsRad));
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
        ownerId: req.body.ownerId
      }, {transaction: req.transcation})
      .then((company) => {
        return Category
        .findById(req.body.category)
          .then((category) => {
            company.addCategory(category)
            .then(resp => {console.log(resp)})
            .catch(err => {console.log(err)});
            Pictures.saveGallery(req, res, company)
            .then(company => {
              res.status(200).send({comp:company, cat:category});
            });
          })
          .catch((err) => res.status(500).send(err));
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
                  // .then(resp => res.status(200).send("Company deleted successfully"))
                  // .catch(error => res.status(500).send(errror))
                res.status(200).send("Company deleted successfully");
              })
            .catch(error => res.status(500).send(errror));
          }
        })
        .catch(error => res.status(500).send(errror));
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
            .catch(error => res.status(500).send(errror));
        }
      })
      .catch(error => res.status(500).send(errror));
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
              .catch(error => res.status(500).send(errror));
          }
        })
        .catch(error => res.status(500).send(errror));
  },
  getByQuery(req, res) {
    let reqCategoryIDs = req.query.categories ? JSON.parse(req.query.categories) : [];
    let categoryQuery = reqCategoryIDs.length > 0 ? {where: {id: {[Op.in]: reqCategoryIDs}}} : {};
    return Category
      .findAll(categoryQuery)
      .then(categories => {
        queryCompaniesPerCategory(req, res, categories);
      })
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
      .then(company => {
        let gallery = [];
        fs.readdir('./db/images/company/'+ company.id, (err, files) => {
          if (files) {
            for (let i = 0; i < files.length; i++) {
              gallery.push('/company/'+company.id+'/picture/' + files[i]);
            }
          }
          let host = req.get('host');
          res.status(200).send({company: company, gallery: gallery, host:host});
        });
      })
      .catch(error => res.status(500).send(error));
  },
  getByIdMiddleware(id, attr) {
      let config = {};
      attr && attr.length > 0 ? config.attributes = attr : null;
      return Company.findById(id, config);
  }
};
