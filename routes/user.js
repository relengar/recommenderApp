const User = require("../db/controllers").user;
const Pictures = require("../db/controllers").pictures;

// callback for the passport responses
const handlePassportResp = (err, user, info, req, res, next) => {
  let resp = {};
  if (err) {
    res.status(500).send(err);
  }
  else if (user) {
    resp.id = user.id;
    resp.firstName = user.firstName;
    resp.lastName = user.lastName;
    resp.name = user.name;
    resp.email = user.email;
    resp.profilePic = user.profilePic;
    // User.saveProfilePic(req, resp)
    req.id = user.id;
    Pictures.savePicture(req, resp)
    .then((resp) => {
      req.login();
      res.status(200).send(resp);
    })
    .catch((err) => {
      req.login(user, (user) => { // sets session
        res.status(200).send(resp);
      });
    });
  }
  else {
    res.status(401).send(info);
  }
};

module.exports = app => {
  //User, with authentication
  app.put("/user", (req, res, next) => {
    // call passport with strategy to register new user
    passport.authenticate('register', (err, user, info) => {
      // handle the passport response
      handlePassportResp(err, user, info, req, res, next);
    })(req, res, next); //parse arguments to scope of passport callback
  });
  app.post("/user/update", User.update);
  app.post("/login", (req, res, next) => {
    // call passport with strategy to login new user
    passport.authenticate('login', (err, user, info) => {
      // handle the passport response
      handlePassportResp(err, user, info, req, res, next);
    })(req, res, next); //parse arguments to scope of passport callback
  });
  app.get('/logout', (req, res) => {
    req.logout();
    res.status(200).send("Logged out");
  });
  app.get("/user/all", User.getAll);
  app.get("/user/:user_id", User.getUser);
  app.get("/user/profilePic/:user_id", Pictures.getPicture);
  app.get("/query/user", User.getForQuery);
  app.delete('/user', User.delete);
  app.delete('/user/deletePicture', (req, res) => {
    Pictures.deleteGallery(req, res)
      .then(resp => res.status(200).send(resp))
      .catch(error => res.status(500).send(error));
  });
};
