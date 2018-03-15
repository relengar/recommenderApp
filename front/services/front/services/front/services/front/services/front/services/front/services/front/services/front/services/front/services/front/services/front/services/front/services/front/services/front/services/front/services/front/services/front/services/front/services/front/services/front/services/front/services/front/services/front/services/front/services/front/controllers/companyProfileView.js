angular.module("recommender")
.component("companyProfileView", {
  templateUrl: "front/partials/companyProfile.html",
  controller:($scope, $location, $stateParams, companyService, discussionService, userService) => {
    $scope.gallery = [];
    $scope.reviews = [];
    $scope.pagination = {
      offset: 0,
      limit: 5,
      count: 0
    };
    let socket;
    $scope.map = {
      center: { latitude: 48.14228475054717, longitude: 17.10018596192424 },
      zoom: 8,
      refresh: false
    };
    $scope.circle = {
      center: { latitude: 48.14228475054717, longitude: 17.10018596192424 },
      radius: 20000,
      fill: {
        color: '#08B21F',
        opacity: 0.5
      },
      stroke: {
        color: '#08B21F',
        opacity: 1,
        weight: 2
      }
    };

    $scope.company = companyService.getCompanyById($stateParams.id, (resp, err) => {
      $scope.company = resp.company;
      if (resp.gallery) {
        resp.gallery.forEach(pic => {
          $scope.gallery.push('/company/'+resp.company.id+'/picture/' + pic);
        });
        // for (let i = 0; i < resp.gallery.length; i++) {
        //   $scope.gallery.push('/company/'+resp.company.id+'/picture/' + resp.gallery[i])
        // }
      }
      $scope.circle.center = { latitude: parseFloat($scope.company.coordsLat), longitude: parseFloat($scope.company.coordsLon) };
      $scope.map.center = { latitude: parseFloat($scope.company.coordsLat), longitude: parseFloat($scope.company.coordsLon) };
      $scope.circle.radius = parseInt($scope.company.coordsRad);
      $scope.map.refresh = true;
      $scope.gallery = resp.gallery ? resp.gallery : [];
      discussionService.getReviewsbyCompany(resp.company.id, $scope.pagination, (reviews, err) => {
        $scope.reviews = reviews.rows;
        $scope.pagination.count = reviews.count;
        socket = new WebSocket("ws://"+resp.host+"/rating"); // set server by factory?
        socket.addEventListener('message', (msg) => {
          let newRating = msg.data;
          $scope.$apply(() => {
            $scope.company.rating = newRating
          })
        });
      });
    });

    $scope.showCommnets = (review, index) => {
      discussionService.getCommentsByReview(review.id,(data, err) => {
        $scope.test = data;
        $scope.reviews[index] = data;
      });
    };
    $scope.viewDiscussion = (docid) => {
      $location.url("review/" + docid);
    };

    $scope.getNextPage = () => {
      $scope.pagination.offset += 5;
      $scope.reviews = discussionService.getReviewsbyCompany($scope.company.id, $scope.pagination, (reviews, err) => {
        $scope.reviews = reviews.rows;
        $scope.pagination.count = reviews.count;
      });
    };

    $scope.getPrevPage = () => {
      $scope.pagination.offset -= 5;
      $scope.reviews = discussionService.getReviewsbyCompany($scope.company.id, $scope.pagination, (reviews, err) => {
        $scope.reviews = reviews.rows;
        $scope.pagination.count = reviews.count;
      });
    };

    $scope.newReview = {
      content: "",
      rating: null,
      user_id: $scope.$parent.currentUser.uid,
      companyId: $stateParams.id
    };
    $scope.debug = "none";
    $scope.postReview = () => {
      $scope.newReview.user_id = $scope.$parent.currentUser.uid;
      discussionService.postReviewToCompany($scope.newReview, (resp, err) => {
        if (resp) {
          $scope.debug = resp.review.id;
          resp.review.reviewer = $scope.$parent.currentUser;
          $scope.company.rating = resp.company.rating;
          $scope.reviews.push(resp.review);
          // socket.send(resp.company.rating);
        }
        $scope.newReview.content = "";
        $scope.newReview.rating = null;
      });
    };
  }
});
