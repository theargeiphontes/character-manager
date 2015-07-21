var expect = require('chai').expect;
var PathfinderCharacter = require('../../src/models/PathfinderCharacter.js');

var __id = 0;
var __charData = {
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
    character = new PathfinderCharacter(__id, __charData);
  });

  describe('#get()', function() {
    it('fetch stats', function() {
      var stats = character.getStats();
      var str = character.getStat('str');

      expect(stats).to.equal(__charData['stats']);
      expect(str).to.equal(__charData['stats']['str']);
    });

    it('fetch class details', function() {
      var charClassList = character.getClassList();

      for(var charClass in charClassList) {
        expect(charClass).to.equal('rogue');
        expect(charClassList[charClass]).to.equal('1');
      }
    });

    it('fetch specific class level', function() {
      expect(character.getClassLevel('rogue')).to.equal('1');
    });

    it('fail to get malformed stat name', function() {
      expect(function() { character.getStat('charm') })
        .to.throw(/Stat not found/);
    });

    it('fail to fetch undefined classList', function() {
      var myCharData = {
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
        'fishy': {
          'rat': '1'
        }
      }
      var myChar = new PathfinderCharacter(1, myCharData);
      expect(function() { myChar.getClassList() })
        .to.throw(/No character classes found/);
    });
  });

  describe('#set()', function() {
    it('set name', function() {
      character.set('name', 'Ian the Great');
      expect(character.get('name')).to.equal('Ian the Great');
    });

    it('set stats', function() {
      character.setStat('str', '12');
      expect(character.getStat('str')).to.equal('12');
    });

    it('add a class level', function() {
      character.updateClass('rogue', '2');
      expect(character.getClassList()['rogue']).to.equal('2');
    });

    it('add new class / mutliclass', function() {
      character.addClass('fighter', '2');
      expect(character.getClassList()['fighter']).to.equal('2');
    });

    it('fail to add new class due to string', function() {
      expect(function() { character.addClass('fighter', 'pie') })
        .to.throw(/Level is not an int/);
    }); 

    it('fail to update class not in classList', function() {
      expect(function() { character.updateClass('swordmage', '5') })
        .to.throw(/not found in list of classes/);
    });

    it('fail to update class due to level cap', function() {
      expect(function() { character.updateClass('rogue', '20') })
        .to.throw(/exceeds level cap/);
    });

    it('fail to update class level by passing string', function() {
      expect(function() { character.updateClass('rogue', 'pie') })
        .to.throw(/Level is not an int/);
    });

    it('fail to update stats by passing string', function(){
      expect(function() { character.setStat('str', 'pie'); })
        .to.throw(/statValue is not an int/);
    });

    it('fail to update stats with out of bounds value', function(){
      expect(function() { character.setStat('str', '500'); })
        .to.throw(/statValue out of bounds/);
    });
  });
});