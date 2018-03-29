const User = require("../../models").User;
const Op = db.Sequelize.Op;

module.exports = {
  getAll(req, res) {
    return User
      .findAndCountAll({
        order: ['id'],
        offset: parseInt(req.query.offset),
        limit: parseInt(req.query.limit),
      })
      .then(users => res.status(200).send(users))
      .catch(error => res.status(500).send({message: error}));
  },
  getUser(req, res) {
    return User
      .findById(req.params.user_id, {
        attributes: ['name', 'firstName', 'lastName', 'id', 'email']
      })
      .then(user => {
        // user.getMyCompany()
        // .then(resp => {res.status(200).send(resp)})
        res.status(200).send(user)
      })
      .catch(error => res.status(500).send(error));
  },
  getByName(req) {
    return User
    .findOne({
      where:{name:req.body.name}
    })
  },
  getById(id) {
    return User
      .findById(id)
  },
  getForQuery(req, res) {
    let tempParam, params = Object.entries(req.query);
    let query = {
      [Op.and]: []
    };
    params.forEach(param => {
      if (param[1] != "") {
        tempParam = {};
        tempParam[param[0]] = {[Op.iLike] : '%'+param[1]+'%'};
        query[Op.and].push(tempParam)
      }
    });
    return User
      .findAll({
        where: query,
        attributes: ["name", "id"]
      })
      // .then(users => res.status(200).send(users))
      .then(users => res.status(200).send(users))
      .catch(error => res.status(500).send(error));
  },
};
