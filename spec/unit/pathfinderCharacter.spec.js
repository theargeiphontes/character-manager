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
      expect(character.getStat('charm')).to.be.undefined;
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
      var myChar = new PathfinderCharacter(2, myCharData);
      expect(myChar.getClassList()).to.be.undefined;
    });
  });

  describe('#set()', function() {
    it('update name and stat', function() {
      character.set('name', 'Ian the Great');
      character.setStat('str', '12');
      expect(character.get('name')).to.equal('Ian the Great');
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
  });

  describe('spells', function() {
    it('cast spells', function() {
      var myCharData =  {
        'name': 'Ian',
        'game': 'pathfinder',
        'stats': {
          'str': '10',
          'dex': '15',
          'con': '10',
          'int': '20',
          'wis': '12',
          'cha': '14'
        },
        'class': {
          'wizard': '3'
        }
      };
      var myCharacter = new PathfinderCharacter(5, myCharData);
      var spellsPerDay = {
        'wizard': {
          '1': '[3, 1]',
          '2': '[4, 2]',
          '3': '[4, 2, 1]',
          '4': '[4, 3, 2]',
          '5': '[4, 3, 2, 1]',
          '6': '[4, 3, 3, 2]',
          '7': '[4, 4, 3, 2, 1]',
          '8': '[4, 4, 3, 3, 2]',
          '9': '[4, 4, 4, 3, 2, 1]',
          '10': '[4, 4, 4, 3, 3, 2]',
          '11': '[4, 4, 4, 4, 3, 2, 1]',
          '12': '[4, 4, 4, 4, 3, 3, 2]',
          '13': '[4, 4, 4, 4, 4, 3, 2, 1]',
          '14': '[4, 4, 4, 4, 4, 3, 3, 2]',
          '15': '[4, 4, 4, 4, 4, 4, 3, 2, 1]',
          '16': '[4, 4, 4, 4, 4, 4, 3, 3, 2]',
          '17': '[4, 4, 4, 4, 4, 4, 4, 3, 2, 1]',
          '18': '[4, 4, 4, 4, 4, 4, 4, 3, 3, 2]',
          '19': '[4, 4, 4, 4, 4, 4, 4, 4, 3, 3]',
          '20': '[4, 4, 4, 4, 4, 4, 4, 4, 4, 4]'
        }
      };
      var spellSlots = myCharacter.loadSpellSlots(spellsPerDay);
      expect(spellSlots['wizard']).to.equal('[4, 2, 1]');
    });
  });

  describe('#validate()', function() {
    it('validate a character is good', function() {
      var errs = character.validate()
      expect(errs['class']).to.be.empty;
      expect(errs['stats']).to.be.empyt;
    });

    it('validate a character has errors', function() {
      var myCharData = {
        'name': 'Ian',
        'game': 'pathfinder',
        'fishy': {
          'rat': '1'
        }
      }
      var myChar = new PathfinderCharacter(5, myCharData);
      var errs = myChar.validate();
      expect(errs['class'].length).to.equal(1);
      expect(errs['stats'].length).to.equal(1);

      myCharData = {
        'name': 'Ian',
        'game': 'pathfinder',
        'stats': {
          'str': '12',
          'dex': '8'
        },
        'class': {
          'rat': '1'
        }
      }
      myChar = new PathfinderCharacter(6, myCharData);
      myChar.addClass('swordmage', 'swordchucks');
      errs = myChar.validate();
      expect(errs['class'].length).to.equal(1);

      myChar.setStat('int', '9001');
      myChar.setStat('cha', 'pie');
      errs = myChar.validate();
      expect(errs['stats'].length).to.equal(2);
    });
  });
});