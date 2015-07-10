//var BPromise = require('bluebird');
var path = require('path');
var pfCharacter = require('../models/PathfinderCharacter.js');
var DB = require('../models/DBFileRead.js');

var dbPath = path.resolve(__dirname + '../data/');
var dbJson = 'pathfinder.json';
var DB = new DB();

var __charData = {};

var PathfinderCharacters = function () {
    var dbload = DB.loadDB(dbPath, dbJson).finally(function() {
        for (var id in dbload) {
          console.log('id >> ' + id);
          __charData.put(new pfCharacter(id, dbload[id]));
          console.log('name >> ' + __charData[id].name);
        }
    });
};

// Returns all the data for a character as json
/*PathfinderCharacter.prototype.getCharacter () {

};*/

module.exports = PathfinderCharacters;