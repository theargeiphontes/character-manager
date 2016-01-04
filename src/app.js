var express = require('express');
var path = require('path');
var jade = require('jade');
var bodyParser = require('body-parser');

module.exports = function(database) {
  var DB = database;

  var app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.set('views', path.join(__dirname, '/templates')); 
  app.set('view engine', 'jade'); 
  app.use('/static', express.static(path.join(__dirname, '/static')));

  var __charData = DB.load();

  var save = function(character) {
    DB.saveEntry(character);
  };

  app.get('/pathfinder/characters/:charId', function (req, res) {
    var charId = req.params.charId;
    var charName = __charData[req.params.charId].get('name');
    var stats = __charData[req.params.charId].getStats();

    var html = jade.renderFile(__dirname + '/templates/index.jade', { 
      charId: charId,
      name: charName,
      stats: stats
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
    res.redirect('/pathfinder/characters/' + req.body.charId);
  });

  app.get('/pathfinder.json', function(req, res) {
    res.send(__charData);
  });

  app.use('/*', function (req, res) { 
    res.render('404', { url: req.url }); 
  });

  var server = app.listen(3000);
  console.log('Listening on http://127.0.0.1:%d/', server.address().port);
};