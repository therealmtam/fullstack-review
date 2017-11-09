const request = require('request');
const config = require('../config.js');
//-------------------------
const db = require('../database');  //Database - Exports Saving of Model to MongoDB


let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
    
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  };
  
  request(options , function (error, response, body) {
    //console.log('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.

    if (error) {
      console.log('Github Request Error ', error);
    }
      
    //save the data into the DB ==> in the saving DB callback, then you call callback() which is where you res.redirect to app.get('/repos') where the page will load with a table of all the data.

    //parse out the body of data and put it into an object that fits the schema 
    
    //db.save(bodyData, callback);

  });
  
}

module.exports.getReposByUsername = getReposByUsername;