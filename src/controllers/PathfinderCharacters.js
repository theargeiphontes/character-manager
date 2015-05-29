var pfCharacter = require('../models/PathfinderCharacter.js');
var DB = require('../models/DBFileRead.js');

var dbPath = '/Users/iames/code/character-manager/src/data/';
var dbJson = 'pathfinder.json';
var DB = new DB();
var __charData = DB.loadDB(dbPath, dbJson);
console.log('pf >>' + __charData);

var charList = {};

var PathfinderCharacters = function () {
    console.log('constructor start');
    if(__charData == null || __charData === '') { throw '__charData is null'; }
    console.log(__charData.length);
    var id = 0;
    for(; id < __charData.length; id++) {
        console.log(__charData[id]);
        charList.push(new pfCharacter(id, __charData[id]));
    }
    console.log('constructor end');
};

// Returns all the data for a character as json
/*PathfinderCharacter.prototype.getCharacter () {

};*/
module.exports = PathfinderCharacters;