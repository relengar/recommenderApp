var recommender = angular.module('recommender', [ "ngRoute", "ngCookies", "ui.router" ]);

recommender.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    controller: "recommenderMainView",
    templateUrl: "front/partials/main.html"
  })
  // .when("/user/:id", {
  //   controller: "userProfileView",
  //   templateUrl: "front/partials/userProfile.html"
  // })
  .when("/review/:id", {
    controller: "discussionController",
    templateUrl: "front/partials/discussion.html"
  })
  .when("/company/:id", {
    controller: "companyProfileView",
    templateUrl: "front/partials/companyProfile.html"
  })
  .when("/register/company", {
    controller: "companyProfileAdmin",
    templateUrl: "front/partials/companyRegisterNew.html"
  })
  .when("/404_page", {
    controller: "recommenderMainView",
    templateUrl: "front/partials/404_page.html"
  })
  .otherwise({redirectTo: "/404_page"});
});
