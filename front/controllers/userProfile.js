angular.module("recommender")
.component("userProfile", {
  templateUrl: "front/partials/userProfile.html",
  controller: ($scope, $stateParams, $state, userService) => {

    $scope.user = {
      name:"",
      email:"",
      password:"",
      nickName:""
    };

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
      userService.register($scope.user, (user, err) => {
        if (user && user.name) {
          $scope.user = user;
          $scope.$parent.setLoggedUser(user);
          $state.transitionTo("root.main");
        }else {
          console.log(user.message)
          // show error somehow
        }
      });
    };

  }
});
