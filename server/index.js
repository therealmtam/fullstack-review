//REQUIRED MODULES:
const express = require('express');
let app = express();
//-----------------
const github = require('../helpers/github');
const bodyParser = require('body-parser');

//EXPRESS MIDDLEWARE:
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())



//EXPRESS ROUTES:
app.post('/repos', function (req, res) {

  // github.saveReposByUsername(req.body.username, function() {
  //   res.redirect('/repos');
  // });

  github.saveReposByUsername(req.body.username, function() {
    github.getReposByUserName(req.body.username, (data) => {
      res.status(201).send(data);
    });
  });
  
});

// app.get('/repos', function (req, res) {

//   var username = 'therealmtam';
//   github.getReposByUserName(username, (data) => {
//     res.status(200).send(data);
//   });

// });

app.get('/top25', function (req, res) {

  github.getTop25((data) => {
    res.status(200).send(data);
  });

});


//I WROTE THIS ROUTE FOR TESTING:
app.get('/fetcher', function (req, res) {
//The Database index.js uses this route as the location to connect to the local MongoDB stored at /data/db
});















let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

