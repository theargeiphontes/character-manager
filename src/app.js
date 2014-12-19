var express = require('express');
var http = require('http');
var jade = require('jade');
var fs = require('fs');

var app = express();

var char_data;

readJSONFile(__dirname + '/../data/ian.json', function (err, json) {
  if(err) { throw err; }
  char_data = json;
  console.log(char_data);
});
 
app.get('/', function(req, res) {
    var html = jade.render('h1 Hello World!');
    res.send(html);
});

/*app.get('/pathfinder/Ian', function(req, res) {
  fs.readFile(__dirname + '/../data/ian.json', function(err, data) {
    var character_data = JSON.parse(data);
    character_data.find({ character: character_data.name }, function (err, data) {
      if(err) { console.log(err); }
      else {
        console.log('Ian' + character_data[0]);
        res.render('character', {
          character: character_data[0]
        });
      }
    });
  });
});*/

app.get('/pathfinder/ian', function(req, res) {
  var html = jade.renderFile(__dirname + "/templates/index.jade", char_data);
  res.send(html);
});

app.get('/pathfinder.json', function(req, res) {
  res.send(char_data);
});

app.get('/pathfinder', function(req, res) {
    
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