const Comment = require("../../models").Comment;
const User = require("../../models").User;

module.exports = {
  create(req, res) {
    return Comment
      .create({
        content: req.body.content,
        commentType: req.body.commentType,
        reviewId: req.params.reviewId,
        userId : (req.body.commentType === "user" ? req.body.commenterId : null),
        comapnyId : (req.body.commentType === "company" ? req.body.commenterId : null)
      })
      .then(comment => res.status(200).send(comment))
      .catch(error => res.status(500).send(error));
  },
  getComments(req, res) {
    return Comment
      .findAndCountAll({
        where: {reviewId: req.params.review_id},
        offset: req.query.offset,
        limit: req.query.limit,
        include: [{
          model: User,
          attributes: ['id', 'name'],
          as: "commentingUser"
        }]
      })
      .then(resp => res.status(200).send(resp))
      .catch(error => res.status(500).send(error));
  }
};
