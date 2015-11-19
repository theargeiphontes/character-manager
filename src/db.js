var BPromise = require('bluebird');

var DBHelper = require('../src/helpers/PathfinderDBHelper.js');
var pfChar = require('../src/models/PathfinderCharacter.js');

var DB = new DBHelper();
var __charData = [];
var dbPath;
var dbJson;

var setDB = function(dbPath, dbJson) {
	this.dbPath = dbPath;
	this.dbJson = dbJson;
}

var saveDB = function() {
  DB.save(dbPath, dbJson, __charData);
};

var loadDB = function() {
	return BPromise.join(DB.load(dbPath, dbJson), 
					function(data) {
					  for(var id in data) {
					    __charData.push(new pfChar(id, data[id]));
					  }
					})
					.catch(function(err) {
						console.error('error =( >> ' + err);
					}).done();
};

var getCharData = function() {
	return __charData;
};

var setCharData = function(charData) {
	__charData = charData;
};

module.exports.setDB = setDB;
module.exports.saveDB = saveDB;
module.exports.loadDB = loadDB;
module.exports.getCharData = getCharData;
module.exports.setCharData = setCharData;

