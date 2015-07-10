var expect = require('chai').expect;
var PathfinderCharacter = require('../../src/models/PathfinderCharacter.js');

var __id = 0;
var __charData0 = {
  'name': 'Ian',
  'game': 'pathfinder',
  'stats': {
    'str': '10',
    'dex': '15',
    'con': '10',
    'int': '14',
    'wis': '12',
    'cha': '14'
  },
  'class': {
    'rogue': '1'
  }
};

describe('pathfinder character', function() {
  var character;

  beforeEach(function() {
    character = new PathfinderCharacter(__id, __charData0);
  });

  describe('#get()', function() {
    it('fetch stats', function() {
      var stats = character.getStats();
      var str = character.getStat('str');

      expect(stats).to.equal(__chardata['stats']);
      expect(str).to.equal(__chardata['stats']['str']);
    });

    it('fetch class details', function() {
    });
  });
});