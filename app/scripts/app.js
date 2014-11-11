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
        templateUrl: 'views/dashboard.html',
        controller:  'DashboardCtrl',
        resolve: {
          authentication: ['authService', function(authService) {
            return authService.isAuthenticated();
          }]
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
