var BPromise = require('bluebird');
var _ = require('underscore');

var DB = require('../../src/models/DBFileRead.js');
var pfChar = require('../../src/models/PathfinderCharacter.js');

var spellTables = {};
var dbPath;
var dbJson;
var dbConn;

var PathfinderDBHelper = function(path, json) {
  dbPath = path;
  dbJson = json;
  dbConn = new DB();
  spellTables = dbConn.loadDB(dbPath, 'spellTables.json');
};

PathfinderDBHelper.prototype.getSpellTables = function() {
  return spellTables;
};

PathfinderDBHelper.prototype.save = function(characterMap) {
  var charJson = {};
  var errs = {};
  var err;
  
  for(var id in characterMap) {
    charJson[id] = characterMap[id].getJson();
    err = characterMap[id].validate();
    
    if(err !== null) {
      errs[id] = err;
    }
  }

  if(_.keys(errs).length > 0) {
    return errs;
  } else {
    console.log('no errors in dbhelper');
    return dbConn.writeDB(dbPath, dbJson, charJson);
  }
};

PathfinderDBHelper.prototype.load = function() {
  var charJson = {};
  BPromise.join(dbConn.loadDB(dbPath, dbJson), 
    function(data) {
      for(var key in data) {
        charJson[key] = new pfChar(key, data[key]);
      }
    })
    .catch(function(err) {
      console.error('error =( >> ' + err);
    }
  ).done();
  return charJson;
};
module.exports = PathfinderDBHelper;