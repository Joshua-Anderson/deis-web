angular.module('deisWebApp').service('authService', ['$http', '$q', '$cookieStore', '$location', function authService($http, $q, $cookieStore, $location) {

    function login(controller, name, password) {
      var request = $http({
        method: 'post',
        url: controller.replace(/\/+$/,'') + '/v1/auth/login/', // Strip trailing slash from input  controller url
        data: {
            username: name,
            password: password
        }
      });

      $cookieStore.put('controller', controller);
      $cookieStore.put('username', name);

      return(request.then(loginSuccess, loginError));
    }

    function loginSuccess(response) {
      $cookieStore.put('token', response.data.token);
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

    function getToken() {
      return $cookieStore.get('token');
    }

    function getUsername() {
      return $cookieStore.get('username');
    }

    function isAuthenticated() {
      if(getToken() === undefined) {
          $location.path('/login');
      } else {
      }
    }

    function logout() {
      $cookieStore.remove('token');
      $cookieStore.remove('controller');
      $cookieStore.remove('username');
      $location.path('/login');
    }

    return({
      login: login,
      isAuthenticated: isAuthenticated,
      logout: logout,
      getUsername: getUsername
    });
  }]);
