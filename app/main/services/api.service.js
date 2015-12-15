'use strict';

angular.module('main').service('API', function ($http, Config) {
  this.getSongs = function () {
    return $http.get(Config.ENV.SERVER_URL + 'songs');
  };

  this.getSong = function (name) {
    return $http.get(Config.ENV.SERVER_URL + 'songs/' + name);
  };
});
