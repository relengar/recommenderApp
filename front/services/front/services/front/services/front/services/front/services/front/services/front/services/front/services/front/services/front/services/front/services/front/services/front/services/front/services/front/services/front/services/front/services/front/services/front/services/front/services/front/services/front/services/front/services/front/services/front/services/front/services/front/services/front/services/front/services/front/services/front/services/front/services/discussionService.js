angular.module("recommender")
.service("discussionService", function($http) {
  this._server = "";

  this.getReviewsbyCompany = (companyId, params, callback) => {
    let config = {
      params
    }
    $http.get(this._server + "/review/company/"+companyId, config)
    .then(
      (resp) => {
        callback(resp.data);
      },
      (resp) => {
        callback(resp);
      }
    );
  };

  this.getCommentsByReview = (rewiewId, pagination, callback) => {
    $http.get(this._server + "/review/"+rewiewId)
      .then(
        (resp) => {
          callback(resp.data);
        },
        (resp) => {
          callback(resp);
        }
      );
  };

  this.postCommentToReview = (newComment, callback) => {
    $http.post(this._server + "/comment/" + newComment.reviewId, newComment)
      .then(
        (resp) => {
          callback(resp.data);
        },
        (resp) => {
          callback(resp);
        }
      );
  };

  this.postReviewToCompany = (newReview, callback) => {
    $http.post(this._server + "/review/" + newReview.companyId, newReview)
      .then(
        (resp) => {
          callback(resp.data);
        },
        (err) => {
          callback(err);
        }
      )
  };
});
