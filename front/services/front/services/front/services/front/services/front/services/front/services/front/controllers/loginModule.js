angular.module("recommender")
.component("loginModule", {
  templateUrl: "front/partials/loginModule.html",
  controller: ($scope, $location, $cookies, userService) => {
    const server = 'http://localhost:8080';
    $scope.showLogin = false;
    $scope.loginError = null;
    $scope.user = {name: "", password: ""};
    $scope.currentUser = $cookies.getObject("currentUser") ? $cookies.getObject("currentUser") : {};
    // $scope.currentUser !== {} ? userService.login({name: , })
    $scope.currentUserPic = $scope.currentUser && $scope.currentUser.uid ? ('http://localhost:8080/user/profilePic/' + $scope.currentUser.uid) : '/front/files/stylish-portfolio/img/bg.jpg';
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

        }
      });
    };

    $scope.setLoggedUser = (user) => {
      $scope.loggedIn = true;
      $scope.currentUser = user;
      $scope.getUserPic();
    };

    $scope.redirect = (page) => {
      $location.url(page);
    };

    $scope.getUserPic = () => {
      if ($scope.currentUser) {
        $scope.currentUserPic = server + '/user/profilePic/' + $scope.currentUser.uid + '?refresh=' + new Date().getTime();
      }
    }

    $scope.usePlaceholder = () => {
      $scope.currentUserPic = '/front/files/stylish-portfolio/img/bg.jpg'; // temp placeholder
    }
  }
});
