var GitHubApi = require("github");
try {
  var ENV = require('./environments.js');
} catch (e) {
  console.log("Local environment vars module not found, using system environment vars instead");
}

var github = new GitHubApi({
  version: "3.0.0",
  debug: true
});

github.authenticate({
  type: "oauth",
  token: ENV['GITHUB_KEY']
});

module.exports = github;
