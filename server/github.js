var GitHubApi = require("github");
var GITHUB_KEY;

try {
  GITHUB_KEY = require('./environments.js')['GITHUB_KEY'];

} catch (e) {
  console.log("Local environment vars module not found, using system environment vars instead");
  GITHUB_KEY = process.env.GITHUB_KEY;
}

var github = new GitHubApi({
  version: "3.0.0",
  debug: true
});

github.authenticate({
  type: "oauth",
  token: GITHUB_KEY
});

module.exports = github;
