'use strict';

angular.module('main')
  .controller('SongCtrl', function (DB, base64, song) {
    var lines, vm;

    vm = this;
    lines = base64.decode(song.content).split('\n');

    this.data = song;
    this.isFavorite = _.isUndefined(song.favorite) ? false : song.favorite;
    this.meta = getMeta(lines);
    this.content = lines.slice(4, lines.length);

    this.favorite = function (song) {
      DB.toggleSongFavorite(song._id, !song.isFavorite).then(function () {
        vm.isFavorite = !vm.isFavorite;
      })
    };

    function getMeta(lines) {
      var meta = {};

      meta.title = _.trim(lines[1].split(':')[1]);
      meta.versions = lines[2];

      return meta;
    }

  });
