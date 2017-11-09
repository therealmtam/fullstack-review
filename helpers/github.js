const request = require('request');
const config = require('../config.js');
//-------------------------
const db = require('../database');  //Database - Exports Saving of Model to MongoDB


let getReposByUsername = (username, callback) => {
    
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
    }
  };
  
  request(options , function (error, response, result) {

    if (error) {
      console.log('Github Request Error ', error);
    }

    var gitData = JSON.parse(result);
    var toBeStored = [];

    if (gitData.message === 'Not Found') {

    } else {
      gitData.forEach((repo, index) => {
        toBeStored.push({
          username: username,
          url: repo.html_url,
          watchers: repo.watchers_count
        });
      });
    }

    console.log(toBeStored);

    callback();
    //db.save(toBeStored, callback);

  });
  
}

module.exports.getReposByUsername = getReposByUsername;