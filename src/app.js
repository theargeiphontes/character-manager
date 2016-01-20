
var express = require('express');
var app = express();
var path = require('path');
var jade = require('jade');
var bodyParser = require('body-parser');
var session = require('cookie-session');

var oauthSecrets = require('../.secrets/client_secret.json');
var Authentication = require('./controllers/authentication.js');

var auth = new Authentication(oauthSecrets, 
      'http://character-manager.i.argeiphontes.com:3000');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: oauthSecrets,
  signed: true
}));

app.set('views', path.join(__dirname, '/templates')); 
app.set('view engine', 'jade'); 
app.use('/static', express.static(path.join(__dirname, '/static')));

// Start of auth routes
app.get('/oauth2/authorize', function(req, res) {
  /* jshint unused:false */
  var stateToken = auth.generateStateToken();
  var authorizeUrl = auth.getClient().generateAuthUrl({
    accessType: 'offline',
    scope: oauthSecrets['web']['scope'] || ['email', 'profile'],
    state: stateToken
  });
  req.session.oauth2statetoken = stateToken;
  if(req.query.return) { 
    req.session.oauth2return = req.query.return; 
  }
  res.redirect(authorizeUrl);
});

app.get('/oauth2callback', function(req, res) {
  if (!req.query.code || req.query.state !== req.session.oauth2statetoken) {
    return res.status(400).send('Invalid auth code or state token.');
  }
  auth.getClient().getToken(req.query.code, function(err, tokens) {
    if (err) { return res.status(400).send(err.message); }
    req.session.oauth2tokens = tokens;

    var client = auth.getClient();
    client.setCredentials(tokens);
    auth.getUserInfo(client, function(err, profile) {
      if (err) { return res.status('500').send(err.message); }
      req.session.profile = {
        id: profile.id,
        displayName: profile.displayName,
        name: profile.name,
        image: profile.image
      };
      res.redirect(req.session.oauth2return || '/');
    });
  });
});

// Start of PF routes
app.get('/pathfinder/characters/:charId', function (req, res) {
  var charId = req.params.charId;
  var character = __charData[charId];

  var html = jade.renderFile(__dirname + '/templates/character.jade', { 
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

app.use('/', function(req, res) {
  res.render(__dirname + '/templates/index.jade');
});

app.use('/*', function (req, res) { 
  res.render('404', { url: req.url }); 
});

app.use(function(err, req, res) {
  /* jshint unused:false */
  console.error(err.stack);
  res.status(500).send('Something broke!');
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