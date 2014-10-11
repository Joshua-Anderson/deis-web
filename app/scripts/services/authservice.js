angular.module('deisWebApp').service('authService', function authService($http, $q) {
    function login(controller, name, password) {
      var request = $http({
        method: 'post',
        url: controller.replace(/\/+$/,'') + '/auth/login', // Strip trailing slash from input  controller url
        data: {
            username: name,
            password: password
        }
      });

      return(request.then(loginSuccess, loginError));
    }

    function loginSuccess(response) {
      return(response.data);
    }

    function loginError(response) {
      if(! angular.isObject( response.data ) || ! response.data.message) {
        return($q.reject('An unknown error occurred.'));
      }

       return($q.reject(response.data.message));
    }

    return({
      login: login
    });
  });
