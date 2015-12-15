'use strict';

angular.module('main').filter('songName', function () {
  return function (filename) {
    var output;

    // Change underscores to spaces
    output = filename.split('_').join(' ');

    // Remove the file extension
    output = output.substr(0, output.length - 3);

    return _.capitalize(output);
  };
});
