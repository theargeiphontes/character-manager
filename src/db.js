var DBHelper = require('../src/helpers/PathfinderDBHelper.js');

var DB;
var dbCache;
var dbPath;
var dbJson;

var db = function(dbPath, dbJson) {
	this.dbPath = dbPath;
	this.dbJson = dbJson;
	DB = new DBHelper();
};

db.prototype.set = function(dbPath, dbJson) {
	this.dbPath = dbPath;
	this.dbJson = dbJson;
};

db.prototype.save = function() {
  DB.save(dbPath, dbJson, dbCache);
};

db.prototype.load = function() {
	dbCache = DB.load();
	return dbCache;
};

db.prototype.getDBCache = function() {
	return dbCache;
};

db.prototype.setDBCache = function(cache) {
	dbCache = cache;
};

db.prototype.saveEntry = function(entry) {
	dbCache[entry.getId()] = entry;
	db.prototype.save();
};


module.exports = db;
// function createDB(dbPath, dbJson) {
//   return dbCache || (dbCache = new db(dbPath, dbJson));
// };