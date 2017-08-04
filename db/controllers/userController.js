const User = require("../models").User;

module.exports = {
  getUser(req, res) {
    return User
      .findById(req.params.user_id)
      .then(users => res.status(200).send(users))
      .catch(error => res.status(500).send(error));
  },
  create(req, res) {
    return User
      .create({
        name: req.body.name,
        email: req.body.email,
        profilePic: req.body.profilePic,
        nickName: req.body.nickName
      })
      .then(users => res.status(200).send(users))
      .catch(error => res.status(500).send(error));
  }
};
