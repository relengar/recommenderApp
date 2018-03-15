const Review = require("../db/controllers").review;
const Comment = require("../db/controllers").comment;

module.exports = (app, ratingWss) => {
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
