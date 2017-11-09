const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');  //Opens a connection to the MongoDB on locally running MongoDB
var Promise = require('bluebird');


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  //An ID is created by the db and a __v
  username: String,
  url: String,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);


let save = (inputData, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var model = new Repo(inputData);
  
  model.save((err, data) => {
    
    if (err) {
      return console.error(err);
    }

    console.log('DATABASE - saved to MongoDB');
    callback();
  });
  
};

// //TEST

// //CHECKS THE CONNECTION:
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log('WE ARE CONNECTED TO THE DB');
// });

// //Creates a new model
// var newRepo = new Repo({ name: 'test'});
// //Save the model to the db:
// save(newRepo);

// Repo.find((err, repos) => {
//     console.log(repos);
// });

// Repo.remove({ _id: '5a038beabc5022299338ec8e'}, (err, repos) => {
//   if (err) {
//     console.log('DATABASE - Error removing model');
//   }
//   console.log('DATABASE - successfully removed model');
// });

module.exports.save = save;



//MONGOOSE NOTES:
//Do not declare methods using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this, so your method will not have access to the document and the above examples will not work.


