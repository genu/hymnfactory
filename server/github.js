var GitHubApi = require("github");
var ENV = require('./environments.js');

var github = new GitHubApi({
  version: "3.0.0",
  debug: true
});

github.authenticate({
  type: "oauth",
  token: ENV['GITHUB_KEY']
});

module.exports = github;
