const Review = require("../models").Review;
const Comment = require("../models").Comment;
const User = require("../models").User;

module.exports = {
  create(req, res) {
    return Review
      .create({
        content: req.body.content,
        rating: req.body.rating,
        companyId: req.params.company_id,
        userId: req.body.user_id //hold userID in $scope to prevent url hack?
      })
      .then(review => res.status(200).send(review))
      .catch(error => res.status(500).send(error));
  },
  getReviewsbyCompany(req, res) {
    console.log(req.query);
    return Review
      .findAndCountAll({
        offset: req.query.offset,
        limit: req.query.limit,
        where: {
          companyId: req.params.company_id
        },
        include: [{
          model: Comment,
          as: "comments",
          limit: 3,
          include: [{
            model: User,
            as: "commentingUser"
          }]
        },
        {
          model:User,
          as: "reviewer"
        }]
      })
      .then(reviews => res.status(200).send(reviews))
      .catch(error => res.status(500).send(error));
  },
  getReviewWithComments(req, res) {
    return Review
      .findById(req.params.review_id, {
        include: [{
          model : Comment,
          as : "comments",
          include: [{
            model: User,
            as: "commentingUser"
          }]
        }]
      })
      .then(review => res.status(200).send(review))
      .catch(error => res.status(500).send(error));
  }
};
