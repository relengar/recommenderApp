const Company = require("../db/controllers").company;
const User = require("../db/controllers").user;
const Review = require("../db/controllers").review;
const Comment = require("../db/controllers").comment;

// callback for the passport responses
let handlePassportResp = (err, user, info, req, res, next) => {
  let resp = {};
  if (err) {
    res.status(500).send(err);
  }
  else if (user) {
    resp.uid = user.id;
    resp.name = user.name;
    resp.email = user.email;
    resp.profilePic = user.profilePic;
    res.status(200).send(resp);
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

  //Company
  app.post("/company", Company.create);
  app.get("/company", Company.getAll);
  app.get("/company/:company_id", Company.getById);

  //Review
  app.post("/review/:company_id", Review.create);
  app.get("/review/company/:company_id", Review.getReviewsbyCompany);
  app.get("/review/:review_id", Review.getReviewWithComments);

  //Comment
  app.post("/comment/:reviewId", Comment.create);
}
