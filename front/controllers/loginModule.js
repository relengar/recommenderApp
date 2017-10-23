angular.module("recommender")
.component("loginModule", {
  templateUrl: "front/partials/loginModule.html",
  controller: ($scope, $location, $cookies, userService) => {
    $scope.showLogin = false;
    $scope.loginError = null;
    $scope.user = {name: "", password: ""};
    $scope.currentUser = $cookies.getObject("currentUser") ? $cookies.getObject("currentUser") : {};
    $scope.loggedIn = $cookies.getObject("currentUser") != null;

    $scope.toggleLoginDialog = () => {
      $scope.showLogin = !$scope.showLogin ;
    };

    $scope.logout = () => {
      userService.logout((resp, err) => {
        $scope.currentUser = {};
        $scope.loggedIn = false;
      });
    };

    $scope.submitLogin = () => {
      userService.login($scope.user, (resp, err) => {
        if (err) {
          $scope.loginError = err;
        }
        else if (!resp.name) {
          $scope.loginError = resp.message;
        }
        else {
          $scope.toggleLoginDialog();
          $scope.user = {name: "", password: ""};
          $scope.setLoggedUser(resp);
          // $scope.loggedIn = true;
          // $scope.currentUser = resp;
        }
      });
    };

    $scope.setLoggedUser = (user) => {
      $scope.loggedIn = true;
      $scope.currentUser = user;
    };

    $scope.redirect = (page) => {
      $location.url(page);
    };
  }
});
