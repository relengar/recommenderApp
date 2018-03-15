angular.module("recommender")
.component("recommenderMainView", {
  templateUrl: "front/partials/main.html",
  controller: ($scope, $location, userService, companyService, uiGmapGoogleMapApi, uiGmapIsReady) => {
    $scope.runningUserQuery = false;
    $scope.showSearchSettings = false;
    $scope.showMap = false;
    $scope.userSearch = {
      name: "",
      firstName: "",
      lastName: "",
      email: ""
    };
    $scope.companySearch = {
      name: "",
      email: "",
      ico: "",
      homepage: "",
      rating: null,
      ownerId: [],
      categories: [],
      geoQuery: false
    };
    $scope.map = {
      center: { latitude: 48.14228475054717, longitude: 17.10018596192424 },
      zoom: 8,
      control: {}
    };
    $scope.marker = {
      id: 1,
      coords: { latitude: 48.14228475054717, longitude: 17.10018596192424 },
      options: { draggable: true },

    };
    $scope.foundUsers = [];
    $scope.foundCompanies = [];

    $scope.toggleSearch = () => {
      $scope.showSearchSettings = !$scope.showSearchSettings;
      uiGmapIsReady.promise()
        .then(maps => {
          $scope.map.control.refresh({ latitude: 48.14228475054717, longitude: 17.10018596192424 });
        })
    };

    $scope.redirect = (page) => {
      $location.url(page)
    };
    $scope.categories = companyService.getCategories((data, err) => {
      $scope.categories = data;
    });

    $scope.getCompanies = (catId) => {
      companyService.getCompaniesbyCategory(catId, (data, err) => {
        $scope.companies = data;
      });
    };

    $scope.customUserSearch = () => {
      $scope.runningUserQuery = true;
      userService.getUsersByQuery($scope.userSearch, (users, err) => {
        owners = [];
        users.forEach(user => {
          owners.push(user.id);
        })
        // for (let i = 0; i < users.length; i++) {
        //   owners.push(users[i].id);
        // }
        $scope.companySearch.ownerId = owners;
        $scope.foundUsers = users ? users : [];
        $scope.runningUserQuery = false;
      });
    };

    $scope.customSearch = () => {
      if ($scope.companySearch.geoQuery) {
        $scope.companySearch.lat = $scope.marker.coords.latitude;
        $scope.companySearch.lon = $scope.marker.coords.longitude;
      }
      companyService.getCompaniesByQuery($scope.companySearch, (companies, err) => {
        $scope.foundCompanies = companies ? companies : [];
      });
    };

  }
});
