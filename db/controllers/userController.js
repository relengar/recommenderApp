const User = require("../models").User;
const Pictures = require("./picturesController.js");
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
        res.status(200).send(user)
      })
      .catch(error => res.status(500).send({message: error}));
  },
  getByName(req) {
    return User
    .findOne({
      where:{name:req.body.name}
    })
  },
  create(req) {
    return User
      .create({
        name: req.body.name,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        profilePic: req.body.profilePic,
        password: req.body.password,
        isOwner: false
      }, {transaction: req.transaction})
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
  update(req, res) {
    if (!req.body.name || req.body.name=="") {
      res.status(400).send({message: "user name is required"});
      return;
    }
    return User
      .update({
        name: req.body.name,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      },{
        where: {id: req.user.id}
      })
      .then(user => {
        if (req.files) {
          req.id = req.body.id;
          Pictures.deleteGallery(req, res)
          .then(msg => {
            Pictures.savePicture(req, res)
            .then(msg => res.status(200).send(msg))
            .catch(error => res.status(207).send(error));
          })
          .catch(error => res.status(207).send(error))
        }
        else {
          res.status(200).send(user);
        }
      })
      .catch(error => res.status(500).send(error));
  },
  delete(req, res) {
    if (!req.isAuthenticated()) {
      res.status(401).send("Unauthorized");
    }
    else {
      Pictures.deleteGallery(req, res)
      .then(resp => {
        User.destroy({
          where: {id: req.user.id}
        })
        .then(deletionStatus => {
          req.logout();
          res.status(200).send("User deleted successfully");
        })
        .catch(error => res.status(500).send(error));
      })
      .catch(error => res.status(500).send(error))
    }
  }
};
