angular.module('deisWebApp')
  .controller('LoginCtrl', ['$scope', '$q', '$location', 'authService', function ($scope, $q, $location, authService) {
    $scope.submitted = false;

    $scope.alerts = [];

    $scope.login = function() {
      var deferred = $q.defer();

      $scope.alerts = [];
      authService.login($scope.user.controller, $scope.user.name, $scope.user.password)
        .then(
          function() {
            deferred.resolve();
            $location.path('/');
          },
          function(data) {
            deferred.reject();
            $scope.alerts.push({'type' : 'danger', 'msg' : data});
          }
        );
        return deferred.promise;
    };
  }])
  .directive('shakeForm', ['$animate', function($animate) {

    return {
      require: '^form',
      scope: {
        submit: '&',
        submitted: '='
      },
      link: function(scope, element, attrs, form) {
        // listen on submit event
        element.on('submit', function() {
          // tell angular to update scope
          scope.$apply(function() {
            scope.$parent.loginForm.submitted = true;
            if (form.$valid) {
              scope.$parent.login().then(
                function(){
                  return;
                },
                function() {
                }
              );
            }

            $animate.addClass(element, 'shake', function() {
              $animate.removeClass(element, 'shake');
            });
          });
        });
      }
    };
  }]);
