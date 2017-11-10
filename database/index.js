const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');  //Opens a connection to the MongoDB on locally running MongoDB
const Promise = require('bluebird');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  //An ID is created by the db and a __v
  username: String,
  url: String,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);


let save = (inputData, callback) => {

console.log(inputData);

  var files = [];
  inputData.forEach(function(repo) {
    
    files.push(
      
      Repo.findOne({'username': repo.username, 'url': repo.url}).exec()
      .then(result => {
        if (result === null) {
          console.log('SAVE');
          return Repo.create(repo, (err, data) => {
            if (err) {
              return console.error(err);
            }
            console.log('SAVE1');
          });

        } else {
          return Repo.create(repo, (err, data) => {
            if (err) {
              return console.error(err);
            }
            console.log('SAVE2');
          });
        }
      })

      //Repo.findOneAndUpdate({'username': repo.username, 'url': repo.url}, repo, {'upsert': true}, function(err, data){});
    );

  });

  

  Promise.all(files)
  .then(function() {
    console.log('DONE');
    callback();
  });
  
//----------------------
  // Repo.create(inputData, (err, data) => {
      
  //   if (err) {
  //     return console.error(err);
  //   }
    
  //   callback();
  // });
  
};

let top25 = (callback) => {

  Repo.find({}).sort({'watchers': -1}).limit(25).exec((err, data) => {
    callback(data);
  });

}

let userRepo = (username, callback) => {

  Repo.find({}).where('username', username).sort({'watchers': -1}).exec((err, data) => {
    callback(data);
  });

}

module.exports.save = save;
module.exports.top25 = top25;
module.exports.userRepo = userRepo;


