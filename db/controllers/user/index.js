const User = require("../../models").User;
const Pictures = require("../pictures");
const getters = require("./getters.js");

module.exports = {
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
  update(req, res) {
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
  },

  getUser: getters.getUser,
  getByName: getters.getByName,
  getById: getters.getById,
  getForQuery: getters.getForQuery
};
