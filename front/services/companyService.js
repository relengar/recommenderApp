angular.module("recommender")
.service("companyService", function($http, Upload) {
  this._server = "";

  this.getCompanyById = (companyId, callback) => {
    $http.get(this._server + "/company/" + companyId)
      .then(
        (resp) => {
          callback(resp.data);
        },
        (resp) => {
          callback(resp);
        }
      );
  };

  this.getCategories = (callback) => {
    $http.get(this._server + "/category")
    .then(
      (resp) => {
        callback(resp.data);
      },
      (err) => {
        callback(err);
      }
    )
  };

  this.getCompaniesbyCategory = (catId, callback) => {
    $http.get(this._server + "/category/" + catId)
    .then(
      (resp) => {
        callback(resp.data);
      },
      (err) => {
        callback(err);
      }
    )
  };

  this.getCompaniesByQuery = (params, callback) => {
    let urlParams = [];
    params = Object.entries(params);
    params.forEach(param => {
      let validValue = param[1] && (param[1].length > 0 || !isNaN(parseInt(param[1])) || typeof param[1] === 'boolean')
      if (validValue) {
        param[1] = typeof param[1] === "object" ? JSON.stringify(param[1]) : param[1];
        urlParams.push(param[0] + "=" + param[1]);
      }
    });
    urlParams = urlParams.join("&");
    $http.get(this._server + "/company/query?" + urlParams)
    .then(
      (resp) => {
        callback(resp.data);
      },
      (err) => {
        callback(err);
      }
    )
  };

  this.createNewCompany = (data, callback) => {
    Upload.upload({
      url: this._server + '/company/',
      method: 'POST',
      data: data
    })
    .then(
      (resp) => {
        callback(resp);
      },
      (err) => {
        callback(err);
      },
      (evt) => {
        console.log(evt);
      }
    );
  };

  this.deleteCompany = (companyId, callback) => {
    $http.delete(this._server + '/company/delete/' + companyId)
    .then(
      (resp) => {
        callback(resp);
      },
      (err) => {
        callback(err);
      }
    );
  };

  this.updateCompany = (data, callback) => {
    Upload.upload({
      url: this._server + '/company/' + data.id,
      method: "POST",
      data: data
    })
    .then(
      resp => callback(resp.data),
      err => callback(err)
    )
    // $http.post(this._server + '/company/'+data.id, data)
    // .then(
    //   resp => {
    //     callback(resp.data);
    //   },
    //   err => {
    //     callback(err);
    //   }
    // )
  };

  this.deleteGallery = (companyId, callback) => {
    $http.delete(this._server + '/company/deleteGallery/'+companyId)
    .then(
      resp => callback(resp),
      err => callback(err)
    );
  };

  this.deletePicture = (pictureName, companyId, callback) => {
    $http.delete(this._server + '/company/deletePicture/'+pictureName+'?id=' + companyId)
    .then(
      resp => callback(resp),
      err => callback(err)
    );
  };

});
