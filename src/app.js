var express = require('express');
var bodyParser = require('body-parser');
//var util = require('util'); 
var jade = require('jade');
var fs = require('fs');

var app = express();

app.set('views', __dirname + '/templates'); 
app.set('view engine', 'jade'); 
app.use(express.static(__dirname, '/javascript'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var __charData = null;

// Initial data load
fs.readFile(__dirname + '/../data/pathfinder.json', function (err, json) {
  if(err) { throw err; }
  __charData = JSON.parse(json);
});

/*function writeCharacter(charId, charData) {
  if(!charId || !charData) { throw 'No data'; }

  console.log(__charData.characters[charId]);
}*/

app.get('/', function(req, res) {
  var html = jade.render('h1 Hello World!');
  res.send(html);
});

app.get('/pathfinder/characters/:charId', function (req, res) {
  var html = jade.renderFile(__dirname + '/templates/index.jade', { 
    charId: req.params.charId,
    character: __charData.characters[req.params.charId]
  });
  res.send(html);
});

app.post('/pathfinder/character/save', function (req, res){
  var __char = __charData.characters[req.body.charId];
  console.log(__char.stats.str);
  console.log(req.body._str);
  __char.stats.str = req.body._str;
  __char.stats.dex = req.body._dex;
  __char.stats.con = req.body._con;
  __char.stats.int = req.body._int;
  __char.stats.wis = req.body._wis;
  __char.stats.cha = req.body._cha;
  __charData.characters[req.body.charId] = __char;

  var save = JSON.stringify(__charData);

  fs.writeFile(__dirname + '/../data/pathfinder.json', 
    save, 
    function (err) {
      if(err) { throw err; }
      console.log('Char saved');
    }
  );
  var html = jade.render('h1 char saved');
  res.send(html);
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

