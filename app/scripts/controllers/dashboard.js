angular.module('deisWebApp')
  .controller('DashboardCtrl', ['$scope', 'authService', function ($scope, authService) {
    $scope.logout = function() {
      authService.logout();
    };

    $scope.username = authService.getUsername();
  }]);
