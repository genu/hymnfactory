var express = require('express');
var router = express.Router();
var github = require('../github.js');

router.get('/', function (req, res) {
  res.send('Invalid request');
});

router.get('/songs', function (req, res) {
  github.repos.getContent({
    user: "genu",
    repo: "hymnfactory",
    path: "db"
  }, function (err, songs) {
    res.json(songs);
  });
});

router.get('/songs/:name', function (req, res) {
  github.repos.getContent({
    user: "genu",
    repo: "hymnfactory",
    path: "db/" + req.params.name
  }, function (err, song) {
    res.json(song);
  })
});


module.exports = router;
