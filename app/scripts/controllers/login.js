angular.module('deisWebApp')
  .controller('LoginCtrl', ['$scope', '$q', 'authService', function ($scope, $q, authService) {
    $scope.submitted = false;

    $scope.alerts = [];

    $scope.login = function() {
      var deferred = $q.defer();

      $scope.alerts = [];
      authService.login($scope.user.controller, $scope.user.name, $scope.user.password)
        .then(
          function(data) {
            console.log(data);
            deferred.resolve('It works!');
          },
          function(data) {
            deferred.reject();
            $scope.alerts.push({'type' : 'danger', 'msg' : data});
          }
        );
        console.log('Username: ' + $scope.user.name + ' Password: ' + $scope.user.password + ' Controller: ' + $scope.user.controller);
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
