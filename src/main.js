var app = require('../src/app.js');
var db = require('../src/db.js');

var dbPath = __dirname + '/data/';
var dbJson = 'pathfinder.json';
//var port = process.argv[0];

db = new db(dbPath, dbJson);
app(db);