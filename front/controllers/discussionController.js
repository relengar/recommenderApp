angular.module("recommender")
.component("discussion", {
  templateUrl: "front/partials/discussion.html",
  controller: ($scope, $location, $stateParams, discussionService) => {
    $scope.pagination = {
      offset: 0,
      limit: 5,
      count: 0
    };
    $scope.newComment = {
      content: "",
      // commentType: $scope.$parent.currentUser.type,
      commentType: "user",
      // commenterId: $scope.$parent.currentUser.uid
    };

    $scope.review = discussionService.getCommentsByReview($stateParams.id, $scope.pagination, (review, err) => {
      $scope.review = review;
      $scope.newComment.reviewId = review.id;
    });

    $scope.postComment = () => {
      $scope.newComment.commenterId = $scope.$parent.currentUser.uid;
      discussionService.postCommentToReview($scope.newComment, (comment, err) => {
        $scope.newComment.content = "";
        $scope.newComment.commentType = "user";
        discussionService.getCommentsByReview($stateParams.id, $scope.pagination, (review, err) => {
          $scope.review = review;
          $scope.newComment.reviewId = review.id;
        });
      });
    };
  }
});
