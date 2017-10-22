angular.module("recommender")
.component("discussion", {
  templateUrl: "front/partials/discussion.html",
  controller: ($scope, $location, $stateParams, companyService) => {
    $scope.review = companyService.getCommentsByReview($stateParams.id, (review, err) => {
      $scope.review = review;
      $scope.newComment.reviewId = review.id;
    });

    $scope.newComment = {
      content: "",
      // commentType: $scope.$parent.currentUser.type,
      commentType: "user",
      commenterId: $scope.$parent.currentUser.uid
    };

    $scope.postComment = () => {
      companyService.postCommentToReview($scope.newComment, (comment, err) => {
        $scope.newComment = {
          content: "",
          // commentType: $scope.$parent.user.type
          commentType: "user",
        };
        companyService.getCommentsByReview($stateParams.id, (review, err) => {
          $scope.review = review;
          $scope.newComment.reviewId = review.id;
        });
      });
    };
  }
});
