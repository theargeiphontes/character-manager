var app = require('../src/app.js');
var db = require('../src/db.js');

var dbPath = __dirname + '/data/';
var dbJSON = 'pathfinder.json';
//var port = process.argv[0];

db = new db(dbPath, dbJSON);
console.log('db >> ' + db);
app(db);