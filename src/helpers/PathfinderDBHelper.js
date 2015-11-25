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
  return DB.loadDB(path, db);
};

PathfinderDBHelper.prototype.load = function(path, db) {
  var charJSON = {};
  BPromise.join(DB.load(path, db), 
    function(data) {
      for(var id in data) {
        charJSON.push(new pfChar(id, data[id]));
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