const Op = db.Sequelize.Op;

const latDistanceInM = 111.19 * 1000;
const lonDistanceInM = 74.23 * 1000;

const getBorderLatLon = (lat, lon, radius) => {
  let result = {maxLat: NaN, minLat: NaN, maxLon: NaN, minLon: NaN};
  let latDistVal = (radius / latDistanceInM);
  let lonDistVal = (radius / lonDistanceInM);
  result.maxLat = lat + (latDistVal);
  result.minLat = lat - (latDistVal);
  result.maxLon = lon + (lonDistVal);
  result.minLon = lon - (lonDistVal);
  return result;
};

const computeGeoDistance = (lat1, lon1, lat2, lon2) => {
  const p = 0.017453292519943295;    // Math.PI / 180
  let a = 0.5 - Math.cos((lat2 - lat1) * p)/2 +
          Math.cos(lat1 * p) * Math.cos(lat2 * p) *
          (1 - Math.cos((lon2 - lon1) * p))/2;
  let debug = 12742000 * Math.asin(Math.sqrt(a));
  return 12742000 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371e3 m
};

const prepareQuery = (req) =>  {
  let ownerIDs = req.query.ownerId ? [].concat(JSON.parse(req.query.ownerId)) : [];
  let categories = req.query.categories ? [].concat(JSON.parse(req.query.categories)) : [];
  let params = ["name", "motto", "ico", "email", "homepage"];
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
  params.forEach(param => {
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

const queryCompaniesPerCategory = async (req, res, categories) => {
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

module.exports = {
  getBorderLatLon,
  computeGeoDistance,
  prepareQuery,
  queryCompaniesPerCategory
};
