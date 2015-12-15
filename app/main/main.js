'use strict';
angular.module('main', ['ionic', 'ngCordova', 'ui.router', 'ab-base64', 'pouchdb'
  ])
  .run(function (API, DB) {
  }).config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/main/songs');
  $stateProvider
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl as menu'
    })
    .state('main.songs', {
      url: '/songs',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/songs.html',
          controller: 'SongsCtrl as songs',
          resolve: {
            songs: function (DB) {
              return DB.getSongs({include_docs: true});
            }
          }
        }
      }
    })
    .state('main.song', {
      url: '/songs/:id',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/song.html',
          controller: 'SongCtrl as song',
          resolve: {
            song: function (DB, $stateParams) {
              return DB.getSong($stateParams.id);
            }
          }
        }
      }
    })
    .state('main.settings', {
      url: '/settings',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/settings.html',
          controller: 'SettingsCtrl as settings'
        }
      }
    })
    .state('main.debug', {
      url: '/debug',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/debug.html',
          controller: 'DebugCtrl as ctrl'
        }
      }
    });
});
