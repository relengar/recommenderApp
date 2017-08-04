angular.module("recommender")
.service("userService", function($http) {
  this.server = "";
  this.getAllTheUsers = (callback) => {
    $http.get(this.server = "")
  }
});
