angular.module('factory.register', [])

.factory('Register', function() {
  return {
    get: function() {
      var userLocalData = localStorage.getObj("userData");

      return userLocalData;
    }
  };
});
