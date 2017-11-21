angular.module("recommender")
.component("companyProfileAdmin", {
  templateUrl: "front/partials/companyRegisterNew.html",
  controller: ($scope, $location, companyService, userService) => {
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
    $scope.categories = companyService.getCategories((data, err) => {
      $scope.categories = data;
    });

    $scope.submitCompany = () => {
      $scope.loader = true;
      $scope.data.ownerId = $scope.$parent.currentUser.uid;
      // userService.register($scope.user, (user, err) => {
      //   register user before creating company?
      // });
      companyService.createNewCompany($scope.data, (company, err) => {
        $scope.loader = false;
        if (!$scope.company) {
          $location.url("/");
        }
      });
    };
  }
});
