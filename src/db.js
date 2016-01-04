var DBHelper = require('../src/helpers/PathfinderDBHelper.js');

var DB;
var dbCache;
var dbPath;
var dbJSON;

var db = function(path, JSON) {
	dbPath = path;
	dbJSON = JSON;
	DB = new DBHelper(dbPath);
};

db.prototype.set = function(path, JSON) {
	dbPath = path;
	dbJSON = JSON;
};

db.prototype.save = function() {
  DB.save(dbPath, dbJSON, dbCache);
};

db.prototype.load = function() {
	dbCache = DB.load(dbJSON);
	return dbCache;
};

db.prototype.getDBCache = function() {
	return dbCache;
};

db.prototype.getTables = function() {
	return DB.getTables();
};

db.prototype.saveEntry = function(entry) {
	dbCache[entry.getId()] = entry;
	db.prototype.save();
};


module.exports = db;
// TODO
// function createDB(dbPath, dbJSON) {
//   return dbCache || (dbCache = new db(dbPath, dbJSON));
// };