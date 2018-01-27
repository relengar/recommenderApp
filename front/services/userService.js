angular.module("recommender")
.service("userService", function($http, $cookies, Upload) {
  this.server = "";

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

  this.getUsersByQuery = (data, callback) => {
    let urlParams = [];
    data = Object.entries(data);
    for (let i = 0; i < data.length; i++) {
      if (data[i][1] && data[i][1] !== "") {
        urlParams.push(data[i][0] + '=' + data[i][1]);
      }
    }
    urlParams = urlParams.join("&");
    $http.get("/query/user?"+urlParams)
    .then(
      (users) => {
        callback(users.data);
      },
      (err) => {
        callback(err);
      }
    )
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
    $http.get('/logout')
    .then(
      (resp) => {
        $cookies.remove("connect.sid");
        $cookies.remove("currentUser");
        this.currentUser = null;
        callback();
      },
      (err) => {
        console.log(err);
        $cookies.remove("connect.sid");
        $cookies.remove("currentUser");
        this.currentUser = null;
        callback();
      }
    );
  };

  this.register = (data, callback) => {
    Upload.upload({
      url: "/user",
      method: 'PUT',
      data: data
    })
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
        },
        (evt) => {
          console.log(evt);
        }
    );
  };

  this.update = (data, callback) => {
    Upload.upload({
      url: "/user/update",
      method: "POST",
      data: data
    })
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
      },
      (evt) => {
        console.log(evt);
      }
    );
  };

  this.deleteUser = (callback) => {
    $http.delete('/user')
      .then(
        (resp) => {
          callback(resp);
        },
        (err) => {
          callback(err);
        }
      );
  };

  this.deleteProfilePic = (callback) => {
    $http.delete('/user/deletePicture')
      .then(
        (resp) => {
          callback(resp);
        },
        (err) => {
          callback(err);
        }
      );
  };

});
