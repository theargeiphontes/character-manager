var express = require('express');
var bodyParser = require('body-parser');
var jade = require('jade');

var DB = require('../src/models/DBFileRead.js');
//var pfCharacters = require('../src/controllers/PathfinderCharacters.js');
var pfChar = require('../src/models/PathfinderCharacter.js');

var app = express();

//pfCharacters = new pfCharacters();

app.set('views', __dirname + '/templates'); 
app.set('view engine', 'jade'); 
app.use(express.static(__dirname, '/javascript'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var dbPath = __dirname + '/data/';
var dbJson = 'pathfinder.json';
var DB = new DB();
var __charData = DB.loadDB(dbPath, dbJson);

if(__charData == null) { throw '__charData is null'; }

var pfChars = {};
for(var id in __charData) {
  pfChars[id] = new pfChar(id, __charData[id]);
}

app.get('/', function(req, res) {
  var html = jade.render('h1 Hello World!');
  res.send(html);
});

app.get('/pathfinder/characters/:charId', function (req, res) {
  var html = jade.renderFile(__dirname + '/templates/index.jade', { 
    charId: req.params.charId,
    character: pfChars[id].getJson()
  });
  res.send(html);
});

app.post('/pathfinder/character/save', function (req, res){
  var __char = __charData[req.body.charId];
  __char.stats.str = req.body._str;
  __char.stats.dex = req.body._dex;
  __char.stats.con = req.body._con;
  __char.stats.int = req.body._int;
  __char.stats.wis = req.body._wis;
  __char.stats.cha = req.body._cha;
  __charData[req.body.charId] = __char;

  console.log(req.body.stats);
  DB.writeDB(dbPath, dbJson, JSON.stringify(__charData, null, 4));
  
  res.redirect('/pathfinder/characters/' + req.body.charId);
});

app.get('/pathfinder.json', function(req, res) {
  res.send(__charData);
});

app.use('/*', function (req, res) { 
  res.render('404', { url: req.url }); 
});

var server = app.listen(3000, function() {
  console.log('Listening on http://127.0.0.1:%d/', server.address().port);
});

