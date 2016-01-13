var express = require('express');
var app = express();
var path = require('path');
var jade = require('jade');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, '/templates')); 
app.set('view engine', 'jade'); 
app.use('/static', express.static(path.join(__dirname, '/static')));

app.get('/pathfinder/characters/:charId', function (req, res) {
  var charId = req.params.charId;
  var character = __charData[charId];

  var html = jade.renderFile(__dirname + '/templates/index.jade', { 
    charId: charId,
    name: character.get('name'),
    stats: character.get('stats')
  });
  res.send(html);
});

app.post('/pathfinder/characters/:charId', function (req, res){
  var character = __charData[req.params.charId];
  var stats = req.body.stats;

  for(var stat in stats) {
    character.setStat(stat, stats[stat]);
  } 
  save(character);
  res.redirect('/pathfinder/characters/' + character.getId());
});

app.get('/pathfinder.json', function(req, res) {
  res.send(__charData);
});

app.use('/*', function (req, res) { 
  res.render('404', { url: req.url }); 
});

var save = function(character) {
  if(DB !== undefined) {
    console.log('db defined');
    var saveSuccessful = DB.saveEntry(character);
    if(saveSuccessful !== true) {
      var saveErrs = saveSuccessful;
      for(var charId in saveErrs) {
        var charErrs = saveErrs[charId];
        for(var key in charErrs) {
          var errs = charErrs[key];
          for(var i in errs) {
            console.log('Error saving charId: ' + charId + ' Error: ' + errs[i]);
          }
        }
      }
    }
  } else {
    console.error('DB is undefined');
  }
};

var __charData = {};

var DB;

var start = function(database) {
  DB = database;
  __charData = DB.load();

  var port = process.env.PORT || 3000;
  app.listen(port);
  console.log('Express server listening on port %d in %s mode', port, app.settings.env);
};

exports.start = start;
exports.app = app;