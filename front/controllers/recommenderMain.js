angular.module("recommender")
.controller('recommenderMainView', function($scope, $location, userService, companyService){
  $scope.selectedCategory;
  $scope.showLogin = false;
  $scope.showSearchSettins = false;

  $scope.user = {
    uid: "",
    passwd: ""
  }

  $scope.categories = [
    {"name": "Building", "id": 1},
    {"name": "IT", "id": 2},
    {"name": "Administration", "id": 3}
  ];

  $scope.toggleLoginDialog = () => {
    $scope.showLogin = !$scope.showLogin ;
  };

  $scope.redirect = (page) => {
    $location.url(page)
  };

  $scope.companies = companyService.getAllCompaniesLikeMoron((data, err) => {
    $scope.companies = data;
  });

});
