angular.module("recommender")
.component("pageNotFound", {
  templateUrl: "front/partials/404_page.html",
  controller: ($scope) => {
    $scope.test = "test";
  }
});
