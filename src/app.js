var express = require('express');
var jade = require('jade');
var BPromise = require('bluebird');

var DB = require('../src/models/DBFileRead.js');
//var pfCharacters = require('../src/controllers/PathfinderCharacters.js');
var pfChar = require('../src/models/PathfinderCharacter.js');

var app = express();

app.set('views', __dirname + '/templates'); 
app.set('view engine', 'jade'); 
app.use(express.static(__dirname, '/javascript'));

var dbPath = __dirname + '/data/';
var dbJson = 'pathfinder.json';

var DB = new DB();
var __charData = [];
BPromise.join(DB.loadDB(dbPath, dbJson), function(data) {
  for(var id in data) {
    __charData.push(new pfChar(id, data[id]));
  }
}).catch(function(err) {
  console.error('error =( >> ' + err);
}).done();

app.get('/', function(req, res) {
  var html = jade.render('h1 Hello World! >> ');
  res.send(html);
});

//pfCharacters = new pfCharacters();

/*var pfChars = {};
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

app.post('/pathfinder/characters/:charId', function (req, res){
  pfChars[req.body.charId].updateStats(req.body.stats);

  console.log(req.body.stats);
  DB.writeDB(dbPath, dbJson, JSON.stringify(__charData, null, 4));
  
  var html = jade.render('h1 Hello World!');
  res.send(html);
  //res.redirect('/pathfinder/characters/' + req.body.charId);
});

app.get('/pathfinder.json', function(req, res) {
  res.send(__charData);
});

app.use('/*', function (req, res) { 
  res.render('404', { url: req.url }); 
});*/

var server = app.listen(3000, function() {
  console.log('Listening on http://127.0.0.1:%d/', server.address().port);
});

