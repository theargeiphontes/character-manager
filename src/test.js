var app = require('../src/app.js');
var dbJs = require('../src/db.js');

var dbPath = __dirname + '/data/';
var dbJson = 'pathfinder.json';

var db = new dbJs(dbPath, dbJson);

app.start(db);