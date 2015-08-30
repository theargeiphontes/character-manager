var _ = require('underscore');

var DB = require('../../src/models/DBFileRead.js');

var PathfinderDBHelper = function() {
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

module.exports = PathfinderDBHelper;