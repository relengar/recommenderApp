angular.module("recommender")
.component("userProfile", {
  templateUrl: "front/partials/userProfile.html",
  controller: ($scope, $stateParams, userService) => {

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
        if (user) {
          $scope.user = user;
        }else {
          // show error somehow
        }
      });
    };

  }
});
