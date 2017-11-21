angular.module("recommender")
.component("recommenderMainView", {
  templateUrl: "front/partials/main.html",
  controller: ($scope, $location, userService, companyService) => {
    $scope.showSearchSettins = false;
    // add categoreis later - figure out the visual for their display

    $scope.redirect = (page) => {
      $location.url(page)
    };
    // $scope.companies = companyService.getAllCompaniesLikeMoron((data, err) => {
    //   $scope.companies = data;
    // });
    $scope.categories = companyService.getCategories((data, err) => {
      $scope.categories = data;
    });

    $scope.getCompanies = (catId) => {
      companyService.getCompaniesbyCategory(catId, (data, err) => {
        $scope.companies = data;
      });
    };
  }
});
