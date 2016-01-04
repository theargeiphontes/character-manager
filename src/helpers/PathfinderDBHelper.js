var BPromise = require('bluebird');

var DB = require('../../src/models/DBFileRead.js');
var pfChar = require('../../src/models/PathfinderCharacter.js');

var spellTables = {};
var dbPath;

var PathfinderDBHelper = function(path) {
  dbPath = path;
  DB = new DB();
  spellTables = DB.loadDB(dbPath, 'spellTables.json');
};

PathfinderDBHelper.prototype.getTables = function() {
  return spellTables;
};

PathfinderDBHelper.prototype.save = function(db, characterMap) {
  var charJSON = {};
  var errs = {};

  for(var id in characterMap) {
    charJSON[id] = characterMap[id].getJSON();
    errs[id] = characterMap[id].validate();
  }

  if(_.keys(errs).length > 0) {
    return errs;
  } else {
    return DB.writeDB(dbPath, db, charJSON);
  }
};

PathfinderDBHelper.prototype.load = function(db) {
  var charJSON = {};
  BPromise.join(DB.loadDB(dbPath, db), 
    function(data) {
      for(var key in data) {
        charJSON[key] = new pfChar(key, data[key]);
      }
    })
    .catch(function(err) {
      console.error('error =( >> ' + err);
    }
  ).done();
  return charJSON;
};
module.exports = PathfinderDBHelper;