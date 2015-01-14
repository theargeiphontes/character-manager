var express = require('express');
var http = require('http');
var jade = require('jade');
var fs = require('fs');

var app = express();
app.set('views', __dirname + '/templates'); 
app.set('view engine', 'jade'); 
var char_data = null;

// Initial data load
fs.readFile(__dirname + '/../data/pathfinder.json', function (err, json) {
  if(err) { throw err; }
  char_data = JSON.parse(json);
  console.log('char_data >> ' + char_data);
  console.log('characters >> ' + char_data.characters);
  console.log('Dan >> ' + char_data.characters['0']);
});

app.get('/', function(req, res) {
    var html = jade.render('h1 Hello World!');
    res.send(html);
});

app.get('/pathfinder/:charId?', function(req, res) {
  var charId = req.params.charId;
  console.log(charId, char_data.characters[charId]);
  var html = jade.renderFile(__dirname + "/templates/index.jade", char_data[charId]);
  res.send(html);
});

app.get('/pathfinder.json', function(req, res) {
  res.send(char_data);
});

app.use('/*', function (req, res) { 
    res.render('404', { url: req.url }); 
});

function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try { callback(null, JSON.parse(data)); } 
    catch(exception) { callback(exception); }
  });
}

var server = app.listen(3000, function() {
  console.log('Listening on http://127.0.0.1:%d/', server.address().port);
});