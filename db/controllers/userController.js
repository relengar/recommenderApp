const User = require("../models").User;


module.exports = {
  getUser(req, res) {
    return User
      .findById(req.params.user_id)
      .then(user => {
        resp = {
          uid:user.id,
          name:user.name,
          email:user.email,
          profilePic:user.profilePic,
        };
        res.status(200).send(resp)
      })
      .catch(error => res.status(500).send(error));
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
        email: req.body.email,
        profilePic: req.body.profilePic,
        nickName: req.body.nickName,
        password: req.body.password
      })
  },
  getById(id) {
    return User
      .findById(id)
  }
};
