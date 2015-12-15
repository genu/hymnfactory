'use strict';
angular.module('main')
  .controller('SongsCtrl', function (API, songs, DB) {
    this.data = songs.rows;
  });
