angular.module("recommender")
.component("recommenderMainView", {
  templateUrl: "front/partials/main.html",
  controller: ($scope, $location, userService, companyService) => {
    $scope.showSearchSettins = false;
    // get real categoreis later - figure out the visual for their display
    $scope.selectedCategory;
    $scope.categories = [
      {"name": "Building", "id": 1},
      {"name": "IT", "id": 2},
      {"name": "Administration", "id": 3}
    ];


    $scope.redirect = (page) => {
      $location.url(page)
    };
    $scope.companies = companyService.getAllCompaniesLikeMoron((data, err) => {
      $scope.companies = data;
    });
  }
});
