angular.module("recommender")
.component("companyProfileAdmin", {
  templateUrl: "front/partials/companyRegisterNew.html",
  controller: ($scope, $location, companyService, userService) => {
    $scope.errors = {
      name : false,
      email: false,
      homepage: false
    };

    $scope.map = { center: { latitude: 48.14228475054717, longitude: 17.10018596192424 }, zoom: 8, refresh: false };
    $scope.circle = {
      center: { latitude: 48.14228475054717, longitude: 17.10018596192424 },
      radius: 20000,
      fill: {
        color: '#08B21F',
        opacity: 0.5
      },
      stroke: {
        color: '#08B21F',
        opacity: 1,
        weight: 2
      }
    };
    navigator.geolocation.getCurrentPosition((pos) => {
      $scope.circle.center = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
      $scope.map.center = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
      $scope.map.refresh = true;
    });

    $scope.loader = false;
    $scope.company = null;//getter for edit page;
    $scope.categories = companyService.getCategories((data, err) => {
      $scope.categories = data;
    });

    $scope.data = {
      gallery: null,
      ico: "",
      name : "",
      email: "",
      homepage: "",
      address: "",
      description: "",
      coordsLon : $scope.circle.center.longitude,
      coordsLat : $scope.circle.center.latitude,
      coordsRad : $scope.circle.radius
    };

    $scope.submitCompany = () => {
      $scope.loader = true;
      $scope.data.coordsLon = $scope.circle.center.longitude;
      $scope.data.coordsLat = $scope.circle.center.latitude;
      $scope.data.coordsRad = $scope.circle.radius;
      $scope.data.ownerId = $scope.$parent.currentUser.uid;
      companyService.createNewCompany($scope.data, (company, err) => {
        $scope.loader = false;
        if (!$scope.company) {
          $location.url("/");
        }
      });
    };
  }
});
