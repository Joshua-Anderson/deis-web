angular
  .module('deisWebApp', [
    'ngResource',
    'ngRoute',
    'ngAnimate',
    'ngCookies',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
