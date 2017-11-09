//REQUIRED MODULES:
const express = require('express');
let app = express();
//-----------------
const github = require('../helpers/github'); //Helpers - Exports getReposByUsername()
const bodyParser = require('body-parser');

//EXPRESS MIDDLEWARE:
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())



//EXPRESS ROUTES:
app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
    console.log(req.body.username);
  //Parse out request for the form data
  //Pass the user name to the github function
  res.redirect('/repos');
  //github.getReposByUsername(req.body.username, res.redirect('/repos'));
  
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  res.send('<!DOCTYPE html><html><head><title>Github Repo Fetcher</title></head><body><h1>HELLOOOOOOO</h1></body></html>');
});


//I WROTE THIS ROUTE FOR TESTING:
app.get('/fetcher', function (req, res) {
//The Database index.js uses this route as the location to connect to the local MongoDB stored at /data/db
});















let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

