angular.module('deisWebApp')
  .controller('LoginCtrl', ['$scope', function ($scope) {
    $scope.submitted = false;
    $scope.login = function() {
      //if('')
      /*authService.login(user.controller, user.name, user.password)
        .then(
          function(data) {
            console.log(data);
          },
          function (data) {
            console.log('Error ' + data);
          }
        );*/
        console.log('Username: ' + $scope.user.name + ' Password: ' + $scope.user.password + ' Controller: ' + $scope.user.controller);
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
              return scope.$parent.login();
            }

            $animate.addClass(element, 'shake', function() {
              $animate.removeClass(element, 'shake');
            });
          });
        });
      }
    };
  }]);
