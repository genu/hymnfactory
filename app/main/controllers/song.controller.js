'use strict';

angular.module('main')
  .controller('SongCtrl', function (base64, song) {
    var lines = base64.decode(song.content).split('\n');

    this.meta = getMeta(lines);
    this.content = lines.slice(4, lines.length);

    this.favorite = function (song) {
      song.isFavorite = !song.isFavorite;
    };

    function getMeta(lines) {
      var meta = {};

      meta.title = _.trim(lines[1].split(':')[1]);
      meta.versions = lines[2];

      return meta;
    }

  });
