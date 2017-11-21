const Company = require("../db/controllers").company;
const User = require("../db/controllers").user;
const Review = require("../db/controllers").review;
const Comment = require("../db/controllers").comment;
const Category = require("../db/controllers").category;

// callback for the passport responses
let handlePassportResp = (err, user, info, req, res, next) => {
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
    User.saveProfilePic(req, resp)
    .then((resp) => {res.status(200).send(resp)})
    .catch((err) => {res.status(200).send(resp)});
    // res.status(200).send(resp);
  }
  else {
    res.status(401).send(info);
  }
};

module.exports = (app) => {
  //User, with authentication
  app.post("/user", (req, res, next) => {
    // call passport with strategy to register new user
    passport.authenticate('register', (err, user, info) => {
      // handle the passport response
      handlePassportResp(err, user, info, req, res, next);
    })(req, res, next); //parse arguments to scope of passport callback
  });

  app.post("/login", (req, res, next) => {
    // call passport with strategy to login new user
    passport.authenticate('login', (err, user, info) => {
      // handle the passport response
      handlePassportResp(err, user, info, req, res, next);
    })(req, res, next); //parse arguments to scope of passport callback
  });
  app.get("/user/:user_id", User.getUser);

  //Category
  app.get("/category", Category.getAll);
  app.get("/category/:category_id", Category.getByName);

  //Company
  app.post("/company", Company.create);
  app.post("/company/test", (req, res, next) => { //test sequelize transactions used in passport strategy
    passport.authenticate('registerCompany', (err, user, info) => {
      handlePassportResp(err, user, info, req, res, next);
    })(req, res, next);
  });
  app.get("/company", Company.getAll);
  app.get("/company/:company_id", Company.getById);

  //Review
  app.post("/review/:company_id", Review.create);
  app.get("/review/company/:company_id", Review.getReviewsbyCompany);
  app.get("/review/:review_id", Review.getReviewWithComments);

  //Comment
  app.post("/comment/:reviewId", Comment.create);
}
