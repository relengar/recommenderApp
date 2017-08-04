angular.module("recommender")
.controller("companyProfileView", function($scope, $routeParams, companyService) {
  $scope.company = companyService.getCompanyById($routeParams.id, (data, err) => {
    $scope.company = data;
  });


  // $scope.getReviews = () => {};
  // $scope.postReview  = function() {};
});
