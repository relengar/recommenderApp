angular.module("recommender")
.component("userProfile", {
  templateUrl: "front/partials/userProfile.html",
  controller: ($scope, $location, $stateParams, $state, userService, companyService) => {
    $scope.companies = [];
    $scope.user = {
      profilePic: null,
      name:"",
      firstName: "",
      lastName: "",
      email:"",
      password:"",
      nickName:""
    };
    $scope.passwordCheck = "";
    $scope.error = null;
    $scope.paramsId = $stateParams.userId;

    if ($stateParams.userId) {
      $scope.user = userService.getUser($stateParams.userId, (user, err) => {
        if (user) {
          $scope.user = user;
          $scope.companies = companyService.getCompaniesByQuery({onwerId: $scope.user.id}, (companies, err) => {
            $scope.companies = companies ? companies : [];
            err ? console.log(err) : null;
          });
        }
        else if (err) {
          console.log(err);
          // show some error
        }
      });
    }

    $scope.submitUser = () => {
      if ($scope.user.password !== $scope.passwordCheck && !$stateParams.userId) {
        $scope.error = "You password does not match the retype."
        return;
      }
      userService.register($scope.user, (user, err) => {
        if (user && user.name) {
          $scope.user = user;
          $scope.$parent.setLoggedUser(user);
          $state.transitionTo("root.main");
        }else {
          $scope.error = user.message;
          // show error somehow
        }
      });
    };

    $scope.updateUser = () => {
      userService.update($scope.user, (user ,err) => {
        if (user) {
          $scope.user.uid = $scope.$parent.currentUser.uid;
          $scope.$parent.setLoggedUser($scope.user);
        }
        else {
          $scope.error = user.message;
        }
      });
    };

    $scope.redirect = (url) => {
      $location.url(url);
    };

    $scope.deleteUser = () => {
      userService.deleteUser((resp, err) => {
        if (resp) {
          $scope.$parent.logout();
          $location.url('/');
        }
      });
    };

    $scope.deleteProfilePic = () => {
      userService.deleteProfilePic((resp, err) => {
        if (resp) {
          $scope.$parent.setLoggedUser($scope.$parent.currentUser);
        }
      });
    }
  }
});
