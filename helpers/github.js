const request = require('request');
const config = require('../config.js');
//-------------------------
const db = require('../database');  //Database - Exports Saving of Model to MongoDB


let saveReposByUsername = (username, callback) => {
    
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

      callback();

    } else {

      gitData.forEach((repo, index) => {
        toBeStored.push({
          username: username,
          url: repo.html_url,
          watchers: repo.watchers_count
        });
      });

      db.save(toBeStored, callback);
    }

  });
  
}


let getTop25 = (callback) => {
    
  db.top25(callback);
}

let getReposByUserName = (username, callback) => {
    
  db.userRepo(username, callback);
}


module.exports.saveReposByUsername = saveReposByUsername;
module.exports.getTop25 = getTop25;
module.exports.getReposByUserName = getReposByUserName;







