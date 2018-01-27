const Company = require("../db/controllers").company;
const User = require("../db/controllers").user;
const Review = require("../db/controllers").review;
const Comment = require("../db/controllers").comment;
const Category = require("../db/controllers").category;
const Pictures = require("../db/controllers").pictures;

// callback for the passport responses
const handlePassportResp = (err, user, info, req, res, next) => {
  let resp = {};
  if (err) {
    res.status(500).send(err);
  }
  else if (user) {
    resp.uid = user.id;
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

module.exports = (app, expressWs) => {
  app.all('*' , (req, res, next) => {
    let re = /.user|comment|review|company*/g;
    let methods = ["POST", "DELETE"];
    if (methods.indexOf(req.method) !== -1 && !req.isAuthenticated() && req.path.search(re) != -1) {
      res.status(401).send("Unauthorized");
    }
    else {
      next();
    }
  });

  let ratingWss = expressWs.getWss('/rating');
  app.ws('/rating', (ws, req) => {
    // ws.on('message', msg => {
    //   ratingWss.clients.forEach(client => {
    //     client.send(msg.data);
    //   })
    // });

    ws.on('close', evt => {
      console.log(evt);
    })
  });

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
  app.get("/user/:user_id", User.getUser);
  app.get("/user/profilePic/:user_id", Pictures.getPicture);
  app.get("/query/user", User.getForQuery);
  app.delete('/user', User.delete);
  app.delete('/user/deletePicture', (req, res) => {
    Company.
    Pictures.deleteGallery(req, res)
      .then(resp => res.status(200).send(resp))
      .catch(error => res.status(500).send(error));
  });
  // app.delete('/user', User.delete);

  //Category
  app.get("/category", Category.getAll);
  app.get("/category/:category_id", Category.getByName);

  //Company
  app.post("/company", Company.create);
  app.post("/company/:company_id", Company.update);
  // app.post("/company/test", (req, res, next) => { //test sequelize transactions used in passport strategy
  //   passport.authenticate('registerCompany', (err, user, info) => {
  //     handlePassportResp(err, user, info, req, res, next);
  //   })(req, res, next);
  // });
  app.delete("/company/delete/:company_id", Company.delete);
  app.delete('/company/deletePicture/:fileName', Company.deleteOnePic);
  app.delete('/company/deleteGallery/:company_id', (req, res) => {
    let comp = Company.getByIdMiddleware(req.params.company_id, ["ownerId"])
    .then(company => {
      if (company.ownerId === req.user.id) {
        Pictures.deleteGallery(req, res)
          .then(resp => res.status(200).send(resp))
          .catch(error => res.status(500).send(error));
      }
      else {
        res.status(401).send("You are not the owner of this company");
      }
    })
    .catch(error => res.status(500).send(error));
  });
  app.get("/company/query", Company.getByQuery);
  app.get("/company/:company_id", Company.getById);
  app.get("/company/:company_id/picture/:picture_name", Pictures.getPicture);

  //Review
  app.post("/review/:company_id", (req, res) => {
    req.wss = ratingWss;
    Review.create(req, res);
  });
  app.get("/review/company/:company_id", Review.getReviewsbyCompany);
  app.get("/review/:review_id", Review.getReviewWithComments);

  //Comment
  app.post("/comment/:reviewId", Comment.create);
}
