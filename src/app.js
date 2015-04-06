var express = require('express');
var bodyParser = require('body-parser');
var util = require('util'); 
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

app.get('/', function(req, res) {
  var html = jade.render('h1 Hello World!');
  res.send(html);
});

app.get('/pathfinder/characters/:charId', function(req, res) {
  var html = jade.renderFile(__dirname + '/templates/index.jade', { 
    character: __charData.characters[req.params.charId]
  });
  res.send(html);
});

app.post('/pathfinder/character/save', function(req, res){
  console.log('req -- ' + util.inspect(req.body));
  var html = jade.render('h1 page');
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