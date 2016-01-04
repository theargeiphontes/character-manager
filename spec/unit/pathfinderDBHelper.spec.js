var expect = require('chai').expect;
var path = require('path');
var BPromise = require('bluebird');

var DBHelper = require('../../src/helpers/PathfinderDBHelper.js');

describe('pathfinder DB helper', function() {
  var dbPath;
  var dbJSON;
  var dbHelper;
  var spTablesJSON;

  beforeEach(function() {
    dbPath = path.resolve(__dirname + '/../../src/data') + '/';
    dbJSON = 'pathfinder.json';
    dbHelper = new DBHelper(dbPath);
  });

  describe('spell tables', function() {
    it('should return list of spell tables', function() {
      BPromise.resolve(dbHelper.getTables())
        .then(function(spellTables) {
          var clericSpellTable = spellTables['cleric'];
          var sorcSpellTable = spellTables['sorcerer'];

          expect(clericSpellTable[0]).to.deep.equal([3, 1]);
          expect(sorcSpellTable[15]).to.deep.equal([0, 6, 6, 6, 6, 6, 6, 5, 3]);
        });
    });
  });
});