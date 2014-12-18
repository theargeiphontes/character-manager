var express = require('express');
var jade = require('jade');
var fs = require('fs');

var app = express();
 
app.get('/', function(req, res) {
    //var html = jade.renderFile(__dirname + '/templates/index.html');
    var html = jade.render('h1 Hello World!');
    res.send(html);
});

app.get('/pathfinder/Ian', function(req, res) {
  fs.readFile(__dirname + '/../data/ian.json', function(err, data) {
    var character_data = JSON.parse(data);
    character_data.find({ character: character_data.name }, function (err, data) {
      if(err) { console.log(err); }
      else {
        console.log('Ian' + character_data[0]);
        res.render('character', {
          character: character_data[0]
        })
      }
    });
  });
});

app.get('/pathfinder.json', function(req, res) {
  fs.readFile(__dirname + '/../data/pathfinder.json', function(err, data) {
    res.send(data);
  });
});

app.get('/pathfinder', function(req, res) {
    fs.readFile(__dirname + '/../data/pathfinder.json', function(err, data) {
        var character_data = JSON.parse(data);
        character_data.notes.push(req.body);
        var character_string = JSON.stringify(character_data, null, 2);
        
        /*fs.writeFile(__dirname + '/../data/pathfinder.json', note_string, function(err) {
            if(err) {
                res.json({
                    error:'Unable to save your character'
                });
            }
        });*/
        res.send(character_data);
    });
});

var server = app.listen(3000, function() {
    console.log('Listening on http://127.0.0.1:%d/', server.address().port);
});