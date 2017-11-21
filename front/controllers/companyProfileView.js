angular.module("recommender")
.component("companyProfileView", {
  templateUrl: "front/partials/companyProfile.html",
  controller:($scope, $location, $stateParams, companyService, userService) => {
    $scope.reviews = [];
    $scope.pagination = {
      offset: 0,
      limit: 5,
      count: 0
    };
    $scope.company = companyService.getCompanyById($stateParams.id, (company, err) => {
      $scope.company = company;
      companyService.getReviewsbyCompany(company.id, $scope.pagination, (reviews, err) => {
        $scope.reviews = reviews.rows;
        $scope.pagination.count = reviews.count;
      });
    });

    $scope.showCommnets = (review, index) => {
      companyService.getCommentsByReview(review.id,(data, err) => {
        $scope.test = data;
        $scope.reviews[index] = data;
      });
    };
    $scope.viewDiscussion = (docid) => {
      $location.url("review/" + docid);
    };

    $scope.getNextPage = () => {
      $scope.pagination.offset += 5;
      $scope.reviews = companyService.getReviewsbyCompany($scope.company.id, $scope.pagination, (reviews, err) => {
        $scope.reviews = reviews.rows;
        $scope.pagination.count = reviews.count;
      });
    };

    $scope.getPrevPage = () => {
      $scope.pagination.offset -= 5;
      $scope.reviews = companyService.getReviewsbyCompany($scope.company.id, $scope.pagination, (reviews, err) => {
        $scope.reviews = reviews.rows;
        $scope.pagination.count = reviews.count;
      });
    };

    $scope.newReview = {
      content: "",
      rating: null,
      user_id: $scope.$parent.currentUser.uid,
      companyId: $stateParams.id
    }
    $scope.postReview = () => {
      $scope.newReview.user_id = $scope.$parent.currentUser.uid;
      companyService.postReviewToCompany($scope.newReview, (review, err) => {
        if (review) {
          review.reviewer = $scope.$parent.currentUser;
          $scope.reviews.push(review);
        }
        $scope.newReview.content = "";
        $scope.newReview.rating = null;
      });
    };
  }
});
