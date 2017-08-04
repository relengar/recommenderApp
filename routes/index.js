const Company = require("../db/controllers").company;
const User = require("../db/controllers").user;
const Review = require("../db/controllers").review;
const Comment = require("../db/controllers").comment;

module.exports = (app) => {
  app.get("/test", (req, res) => {
    res.status(200).send({
      msg : "test message response."
    });
  });
  //User
  app.post("/user", User.create);
  app.get("/user/:user_id", User.getUser);

  //Company
  app.post("/company", Company.create);
  app.get("/company", Company.getAll);
  app.get("/company/:company_id", Company.getById);

  //Review
  app.post("/review/:company_id", Review.create);
  app.get("/review/:company_id", Review.getReviewsbyCompany);

  //Comment
  app.post("/comment", Comment.create);
  // app.get();
}
