'use strict';

angular.module('main').service('DB', function ($q, $rootScope, pouchDB, API) {
  var vm = this;
  var db = pouchDB('hymnfactory');


  this.init = function () {
    db = pouchDB('hymnfactory');

    return db;
  };

  this.destroy = function () {
    return db.destroy();
  };

  this.getSongs = function (options) {
    var deferred = $q.defer();

    db.allDocs(options).then(function (docs) {
      //If there are no songs, sync with github
      if (docs.rows.length === 0) {
        API.getSongs().then(function (songs) {
          $rootScope.$broadcast('Indexing:started');
          _.forEach(songs.data, function (song) {
            vm.addSong(song);
          });
          $rootScope.$broadcast('Indexing:finished');
          deferred.resolve(vm.getSongs(options));
        });
      } else {
        deferred.resolve(docs);
      }
    }).catch(function (err) {
      debugger;
    });

    return deferred.promise;
  };

  this.getSong = function (id) {
    var deferred = $q.defer();

    db.get(id).then(function (doc) {
      // If content doesn't exist, get sync this doc with github
      if (_.isUndefined(doc.content)) {
        API.getSong(doc.name).then(function (song) {
          doc.content = song.data.content;
          db.put(doc).then(function () {
            deferred.resolve(doc);
          })
        });
      } else {
        deferred.resolve(doc);
      }
    });

    return deferred.promise;
  };

  this.findFavorites = function () {
    var deffered = $q.defer();

    db.query(function (doc, emit) {
      emit(doc.favorite);
    }, {key: true, include_docs: true}).then(function (favorites) {
      deffered.resolve(favorites);
    });

    return deffered.promise;
  };

  this.toggleSongFavorite = function (id, value) {
    var deferred = $q.defer();

    db.get(id).then(function (doc) {
      if (_.isUndefined(doc.favorite)) {
        doc.favorite = value;
      } else {
        doc.favorite = !doc.favorite;
      }

      db.put(doc).then(function () {
        deferred.resolve(doc);
      })
    });

    return deferred.promise;

  };
  this.addSong = function (song) {
    // Remove _* fields (couchDB restriction)
    delete song._links;

    return db.post(song);
  };
});


