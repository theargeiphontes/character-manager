var DBHelper = require('../src/helpers/PathfinderDBHelper.js');

var DB;
var dbCache;
var dbPath;
var dbJson;

var db = function(path, json) {
	dbPath = path;
	dbJson = json;
	DB = new DBHelper(dbPath, dbJson);
};

db.prototype.set = function(path, json) {
	dbPath = path;
	dbJson = json;
};

db.prototype.save = function() {
  return DB.save(dbCache);
};

db.prototype.load = function() {
	dbCache = DB.load(dbJson);
	return dbCache;
};

db.prototype.getDBCache = function() {
	return dbCache;
};

db.prototype.saveEntry = function(entry) {
	dbCache[entry.getId()] = entry;
	return db.prototype.save();
};

module.exports = db;
// TODO
// function createDB(dbPath, dbJson) {
//   return dbCache || (dbCache = new db(dbPath, dbJson));
// };