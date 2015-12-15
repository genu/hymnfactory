'use strict';

angular.module('main').controller('SettingsCtrl', function ($state, $ionicHistory, $ionicPopup, DB) {
  this.clearCache = function () {
    DB.destroy().then(function () { // Delete the DB
      DB.init().then(function () { // Create the DB
        $ionicPopup.alert({
          title: "Cache Cleared",
          subTitle: 'Songs will automatically be cached as you view them'
        }).then(function () {
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('main.songs');
        })
      })
    })
  }
});
