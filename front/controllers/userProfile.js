angular.module("recommender")
.component("userProfile", {
  templateUrl: "front/partials/userProfile.html",
  controller: ($scope, $stateParams, $state, userService) => {

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
        }
        else if (err) {
          // show some error
        }
      });
    }

    $scope.submitUser = () => {
      if ($scope.user.password !== $scope.passwordCheck) {
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

  }
});
