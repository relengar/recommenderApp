const Review = require("../models").Review;
const Comment = require("../models").Comment;
const User = require("../models").User;
const Company = require("../models").Company;

let mean = (history) => {
  let mean = 0;
  history.forEach((rating) => {
    mean += parseInt(rating);
  });
  return mean / history.length;
};

module.exports = {
  create(req, res) {
    return Review
      .create({
        content: req.body.content,
        rating: req.body.rating,
        companyId: req.params.company_id,
        userId: req.body.user_id //hold userID in $scope to prevent url hack?
      })
      .then(review => {
        return Company
        .findById(req.params.company_id)
        .then((company, review) => {
          company.ratingHistory.push(req.body.rating);
          company.rating = mean(company.ratingHistory);
          company.save({fields: ['rating', 'ratingHistory']})
          .then((review, company) => res.status(200).send({review:review, company:company}))
          .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));
      })
      .catch(error => res.status(500).send(error));
  },
  getReviewsbyCompany(req, res) {
    return Review
      .findAndCountAll({
        offset: req.query.offset,
        limit: req.query.limit,
        attributes: ['id', 'content', 'rating'],
        where: {
          companyId: req.params.company_id
        },
        include: [{
          model: Comment,
          as: "comments",
          limit: 3,
          include: [{
            model: User,
            attributes: ['name', 'id'],
            as: "commentingUser"
          }]
        },
        {
          model:User,
          attributes: ['id', 'name'],
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
          offset: req.query.offset,
          limit: req.query.limit,
          include: [{
            model: User,
            attributes: ['id', 'name'],
            as: "commentingUser"
          }]
        },
        {
          model:User,
          attributes: ['id', 'name'],
          as: "reviewer"
        }]
      })
      .then(review => res.status(200).send(review))
      .catch(error => res.status(500).send(error));
  }
};
