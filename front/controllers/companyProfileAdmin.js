angular.module("recommender")
.component("companyProfileAdmin", {
  templateUrl: "front/partials/companyRegisterNew.html",
  controller: ($scope, $location, companyService) => {
    $scope.data = {
      name : "",
      email: "",
      homepage: "",
      address: "",
      description: ""
    };
    $scope.errors = {
      name : false,
      email: false,
      homepage: false
    };
    $scope.loader = false;
    $scope.company = null;//getter for edit page;

    $scope.submitCompany = () => {
      $scope.loader = true;
      companyService.createNewCompany($scope.data, (company, err) => {
        $scope.loader = false;
        if (!$scope.company) {
          $location.url("/");
        }
      });
    };
  }
});
// .controller("companyProfileAdmin", function($scope, $location, companyService) {
//   $scope.data = {
//     name : "",
//     email: "",
//     homepage: "",
//     address: "",
//     description: ""
//   };
//   $scope.errors = {
//     name : false,
//     email: false,
//     homepage: false
//   };
//   $scope.loader = false;
//   $scope.company = null;//getter for edit page;
//
//   $scope.submitCompany = () => {
//     $scope.loader = true;
//     companyService.createNewCompany($scope.data, (company, err) => {
//       $scope.loader = false;
//       if (!$scope.company) {
//         $location.url("/");
//       }
//     });
//   };
//
// });
