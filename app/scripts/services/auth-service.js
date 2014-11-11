angular.module('deisWebApp').service('authService', function authService($http, $q) {
    function login(controller, name, password) {
      var request = $http({
        method: 'post',
        url: controller.replace(/\/+$/,'') + '/v1/auth/login/', // Strip trailing slash from input  controller url
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
      if(response.status === 0 || response.status === 404) {
        return($q.reject('Controller not found'));
      } else if(response.status === 400) {
          return($q.reject('Invalid Username or Password'));
      } else if(! angular.isObject( response.data ) || ! response.data.message) {
          return($q.reject('An unknown error occurred.'));
      }

       return($q.reject(response.data.message));
    }

    return({
      login: login
    });
  });
