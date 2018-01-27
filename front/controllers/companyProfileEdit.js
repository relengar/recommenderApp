angular.module("recommender")
.component("companyProfileEdit", {
  templateUrl: 'front/partials/companyProfileEdit.html',
  controller: ($scope, $location, $stateParams, companyService) => {
    $scope.gallery = [];
    $scope.currentCompany = companyService.getCompanyById($stateParams.id, (resp, error) => {
      // if ($scope.$parent.currentUser.uid !== resp.company.id) {
      //   $location.url('/');
      // }
      if (resp && resp.company) {
        $scope.currentCompany = resp.company;
        if (resp.gallery) {
          for (let i = 0; i < resp.gallery.length; i++) {
            $scope.gallery.push('/company/'+resp.company.id+'/picture/' + resp.gallery[i])
          }
        }
        $scope.gallery = resp.gallery ? resp.gallery : [];
      }
    });

    $scope.updateCompany = () => {
      $scope.currentCompany.gallery = [];
      for (var i = 0; i < $scope.gallery.length; i++) {
        if ($scope.gallery[i].$ngfName) {
          $scope.currentCompany.gallery .push($scope.gallery[i]);
        }
      }
      companyService.updateCompany($scope.currentCompany, (resp, err) => {
        $scope.currentCompany = resp;
      });
    };

    $scope.deleteCompany = () => {
      companyService.deleteCompany($scope.currentCompany.id, (resp, err) => {
        $location.url('/');
      });
    };

    $scope.deletePicture = (pic) => {
      if (typeof pic === "object") {
        $scope.gallery.splice($scope.gallery.indexOf(pic), 1);
      }
      else {
        let picName = pic.split('/');
        picName = picName[picName.length -1];
        companyService.deletePicture(picName, $scope.currentCompany.id, (resp, err) => {
          if (resp) {
            $scope.gallery.splice($scope.gallery.indexOf(pic), 1);
          }
        });
      }
    };

    $scope.deleteGallery = () => {
      companyService.deleteGallery($scope.currentCompany.id, (resp, err) => {
        if (resp) {
          $scope.gallery = [];
        }
      });
    };

  }
});
