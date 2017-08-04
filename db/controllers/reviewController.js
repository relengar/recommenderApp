const Review = require("../models").Review;
const Comment = require("../models").Comment;

module.exports = {
  create(req, res) {
    console.log(req.params.company_id);
    // console.log("obj start \n\n\n");
    // console.log(Review.rawAttributes);
    // console.log("\n\n\nobj end \n\n\n");
    console.log(Object.keys(Review.rawAttributes));
    return Review
      .create({
        content: req.body.content,
        rating: req.body.rating,
        companyId: req.params.company_id,
        // reviewedCompany: req.params.company_id,
        userId: req.body.user_id //hold userID in $scope to prevent url hack?
      })
      .then(review => res.status(200).send(review))
      .catch(error => res.status(500).send(error));
  },
  getReviewsbyCompany(req, res) {
    return Review
      .findAll({
        where: {
          // reviewedCompany: req.params.company_id
          // companyId: req.params.company_id
        }
      //   include: [{
      //     model : Comment,
      //     as : "comment"
      //   }]
      })
      .then(review => res.status(200).send(review))
      .catch(error => res.status(500).send(error));
  }
};
