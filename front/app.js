// var recommender = angular.module('recommender', ['ngCookies', 'ui.router', 'ngFileUpload']);
var recommender = angular.module('recommender', ['ngCookies', 'ui.router', 'ngFileUpload', 'uiGmapgoogle-maps']);

recommender.config(function($stateProvider, uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDSfomPj1I5i7jlGkKb41r39uZJnkIF59o',
        // v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'geometry' //'weather,geometry,visualization'
    });
  let states = [
    {
      name:'root',
      component: "loginModule"
    },
    {
      name:'root.main',
      url:"/",
      component: "recommenderMainView",
    },
    {
      name:"root.companyProfile",
      url:"/company/{id}",
      component:"companyProfileView",
    },
    {
      name:"root.companyProfileEdit",
      url:"/edit/company/{id}",
      component:"companyProfileEdit",
    },
    {
      name:"root.companyRegister",
      url:"/register/company",
      component:"companyProfileAdmin",
    },
    {
      name:"root.discussion",
      url:"/review/{id}",
      component:"discussion"
    },
    {
      name:"root.userProfile",
      url:"/user/{userId}",
      component:"userProfile"
    },
    {
      name: "root.404Page",
      url:"*path",
      component:"pageNotFound"
    }
  ];

  for (let i = 0; i < states.length; i++) {
    $stateProvider.state(states[i]);
  }
});
