angular.module("recommender")
.component("recommenderMainView", {
  templateUrl: "front/partials/main.html",
  controller: ($scope, $location, userService, companyService) => {
    $scope.showSearchSettins = false;
    // add categoreis later - figure out the visual for their display


    $scope.redirect = (page) => {
      $location.url(page)
    };
    $scope.companies = companyService.getAllCompaniesLikeMoron((data, err) => {
      $scope.companies = data;
    });
  }
});
