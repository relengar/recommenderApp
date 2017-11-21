angular.module("recommender")
.service("companyService", function($http) {
  this._server = "";

  // test function
  this.getAllCompaniesLikeMoron = (callback) => {
    $http.get(this._server + "/company")
      .then(
        (resp) => {
          callback(resp.data);
        },
        (err) => {
          callback(err);
        }
      );
  };

  this.getCategories = (callback) => {
    $http.get(this._server + "/category")
    .then(
      (resp) => {
        callback(resp.data);
      },
      (err) => {
        callback(err);
      }
    )
  };

  this.getCompaniesbyCategory = (catId, callback) => {
    $http.get(this._server + "/category/" + catId)
    .then(
      (resp) => {
        callback(resp.data);
      },
      (err) => {
        callback(err);
      }
    )
  };

  this.createNewCompany = (data, callback) => {
    $http.post("/company/", data)
      .then(
        (resp) => {
          callback(resp);
        },
        (resp) => {
          callback(resp);
        }
      );
  }

  this.getCompanyById = (companyId, callback) => {
    // $http.get(this._server + "/companies/getById", {params:{id:companyId}})
    $http.get(this._server + "/company/" + companyId)
      .then(
        (resp) => {
          callback(resp.data);
        },
        (resp) => {
          callback(resp);
        }
      );
  };

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

  this.getCommentsByReview = (rewiewId, callback) => {
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
