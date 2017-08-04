angular.module("recommender")
.service("companyService", function($http) {
  this._server = "";

  // test function
  this.getAllCompaniesLikeMoron = (callback) => {
    //changed syntax due to newer version of angular
    // $http.get(this._server + "/companies/getAll")
    $http.get(this._server + "/company")
      .then(
        function (resp) {
          callback(resp.data);
        },
        function (resp) {
          callback(resp);
        }
      );
  };

  this.getCompanyById = (companyId, callback) => {
    // $http.get(this._server + "/companies/getById", {params:{id:companyId}})
    $http.get(this._server + "/company/" + companyId)
      .then(
        function(resp) {
          callback(resp.data);
        },
        function(resp) {
          callback(resp);
        }
      );
  };

});
