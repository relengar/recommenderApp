angular.module("recommender")
.service("userService", function($http, $cookies, Upload) {
  this.server = "";
  this.currentUser = {name:"dude"};

  this.getCurrentUser = (callback) => {
    callback(this.currentUser);
  };

  this.getUser = (userId, callback) => {
    $http.get(this.server + "/user/" + userId)
    .then(
      (user) => {
        callback(user.data);
      },
      (err) => {
        callback(err);
      }
    );
  };

  this.login = (data, callback) => {
    $http.post("/login", data)
    .then(
      (resp) => {
        if (resp.data.name) {
          $cookies.putObject("currentUser", resp.data);
          this.currentUser = resp.data;
        }
        callback(resp.data);
      },
      (err) => {
        callback(err);
      }
    );
  };

  this.logout = (callback) => {
    $cookies.remove("currentUser");
    this.currentUser = null;
    callback();
  };

  this.register = (data, callback) => {
    // $http.post("/user", data)
    // .then(
    //   (resp) => {
    //     if (resp.data.name) {
    //       if (resp.data.name) {
    //         $cookies.putObject("currentUser", resp.data);
    //         this.currentUser = resp.data;
    //       }
    //     }
    //     callback(resp.data);
    //   },
    //   (err) => {
    //     callback(err);
    //   }
    // );
    Upload.upload({
      url: "/user",
      data: data
    })
    .then(
      (resp) => {
          if (resp.data.name) {
            if (resp.data.name) {
              $cookies.putObject("currentUser", resp.data);
              this.currentUser = resp.data;
            }
          }
          callback(resp.data);
        },
        (err) => {
          callback(err);
        },
        (evt) => {
          console.log(evt);
        }
    );
  };

});
