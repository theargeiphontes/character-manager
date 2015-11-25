var _ = require('underscore');
var BPromise = require('bluebird');

var DB = require('../../src/models/DBFileRead.js');
var pfChar = require('../../src/models/PathfinderCharacter.js');

var PathfinderDBHelper = function() {
  DB = new DB();
};

PathfinderDBHelper.prototype.save = function(path, db, characterMap) {
  var charJSON = {};
  var errs = {};

  for(var id in characterMap) {
    charJSON[id] = characterMap[id].getJSON();
    errs[id] = characterMap[id].validate();
  }

  if(_.keys(errs).length > 0) {
    return errs;
  } else {
    return DB.writeDB(path, db, charJSON);
  }
};

PathfinderDBHelper.prototype.load = function(path, db) {
  var charJSON = {};
  BPromise.join(DB.loadDB(path, db), 
    function(data) {
      for(var key in data) {
        charJSON[key] = new pfChar(key, data[key]);
      }
    })
    .catch(function(err) {
      console.error('error =( >> ' + err);
    })
  .done();
  return charJSON;
};

// TODO: Spell table loading

module.exports = PathfinderDBHelper;