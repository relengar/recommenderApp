const User = require("../models").User;


module.exports = {
  getUser(req, res) {
    return User
      .findById(req.params.user_id, {attributes: ['name', 'firstName', 'lastName', 'id', 'email']})
      .then(user => {
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
  create(req) {
    return User
      .create({
        name: req.body.name,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        profilePic: req.body.profilePic,
        password: req.body.password
      }, {transaction: req.transaction})
  },
  getById(id) {
    return User
      .findById(id)
  },
  saveProfilePic(req, resp) {
    return new Promise((resolve, reject) => {
      if (req.files && req.files.profilePic) {
        let tempPic = req.files.profilePic;
        fs.mkdir('./db/images/user/'+resp.uid, (err) => {
          if (err) {
            resp.profilePicStatus = err;
          }
          tempPic.mv('./db/images/user/'+resp.uid+'/profilePic.' + tempPic.name.split(".")[1], (err) => {
            if (err) {
              resp.profilePicStatus = err;
              reject(resp);
            }
            else {
              resp.profilePicStatus = "Profile image uploaded";
              resolve(resp);
            }
          });
        });
      }
      else {
        resp.profilePicStatus = "No image uploaded";
        reject(resp);
      }
    });
  },
  getProfilePic(req, res) {
    res.status(200).sendFile('../images/user/'+req.user_id+'/'+req.fileName);
  }
};
