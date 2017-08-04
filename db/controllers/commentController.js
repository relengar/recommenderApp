const Comment = require("../models").Comment;

module.exports = {
  create(req, res) {
    return Comment
      .create({
        content: req.body.content,
        commentType: req.body.commentType,
        reviewId: req.params.reviewId,
        userId : (commentType === "user" ? req.body.commenterId : null),
        comapnyId : (commentType === "company" ? req.body.commenterId : null)
      })
      .then(comment => res.status(200).send(comment))
      .catch(error => res.status(500).send(error));
  }
};
