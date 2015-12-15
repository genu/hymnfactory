'use strict';
angular.module('main').controller('SongsCtrl', function (songs) {
  this.data = songs.rows;
});
