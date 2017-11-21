var recommender = angular.module('recommender', ['ngCookies', 'ui.router', 'ngFileUpload']);

recommender.config(function($stateProvider) {
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
