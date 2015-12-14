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

router.get('/song/:name', function (req, res) {
  console.log(req.params.name);
  github.repos.getContent({
    user: "genu",
    repo: "hymnfactory",
    path: "db/" + req.params.name
  }, function (err, song) {
    res.json(song);
  })
});


module.exports = router;
