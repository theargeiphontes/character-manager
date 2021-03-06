var expect = require('chai').expect;
var PathfinderCharacter = require('../../src/models/PathfinderCharacter.js');

var __id = 0;
var __charData = {
        "name": "Dan",
        "game": "pathfinder",
        "stats": {
            "str": "12",
            "dex": "16",
            "con": "8",
            "int": "20",
            "wis": "10",
            "cha": "20"
        },
        "class": {
            "wizard": "3"
        },
        "spellsKnown": {
            "wizard": [
                [
                    "Acid Splash",
                    "Daze",
                    "Light",
                    "Ghost Sounds",
                    "Prestidigitation"
                ],
                [
                    "Grease",
                    "Mage Armor",
                    "Color Spray",
                    "Magic Missile"
                ],
                [
                    "Invisibility",
                    "Burning Arc",
                    "Blur"
                ]
            ]
        },
        "spellsPrepared": {
            "wizard": {}
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
        expect(charClass).to.equal('wizard');
        expect(charClassList[charClass]).to.equal('3');
      }
    });

    it('fetch specific class level', function() {
      expect(character.getClassLevel('wizard')).to.equal('3');
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
        'name': 'Dan',
        'game': 'pathfinder',
        'stats': {
          'str': '12',
          'dex': '16',
          'con': '8',
          'int': '20',
          'wis': '10',
          'cha': '17'
        },
        'class': {
          'wizard': '3'
        },
        'spellsKnown': {
          'wizard': {
            '0': ['Acid Splash', 'Daze', 'Light', 'Ghost Sounds', 'Prestidigitation'],
            '1': ['Grease', 'Mage Armor', 'Color Spray', 'Magic Missile'],
            '2': ['Invisibility', 'Burning Arc', 'Blur']
          }
        },
        'spellsPrepared': {
          'wizard': { }
        } 
      };
      var myCharacter = new PathfinderCharacter(5, myCharData);
      var spellsPerDay = {
        'wizard': {
          '1': [3, 1],
          '2': [4, 2],
          '3': [4, 2, 1],
          '4': [4, 3, 2],
          '5': [4, 3, 2, 1],
          '6': [4, 3, 3, 2],
          '7': [4, 4, 3, 2, 1],
          '8': [4, 4, 3, 3, 2],
          '9': [4, 4, 4, 3, 2, 1],
          '10': [4, 4, 4, 3, 3, 2],
          '11': [4, 4, 4, 4, 3, 2, 1],
          '12': [4, 4, 4, 4, 3, 3, 2],
          '13': [4, 4, 4, 4, 4, 3, 2, 1],
          '14': [4, 4, 4, 4, 4, 3, 3, 2],
          '15': [4, 4, 4, 4, 4, 4, 3, 2, 1],
          '16': [4, 4, 4, 4, 4, 4, 3, 3, 2],
          '17': [4, 4, 4, 4, 4, 4, 4, 3, 2, 1],
          '18': [4, 4, 4, 4, 4, 4, 4, 3, 3, 2],
          '19': [4, 4, 4, 4, 4, 4, 4, 4, 3, 3],
          '20': [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
        }
      };
      var spellSlots = myCharacter.loadSpellSlots(spellsPerDay);
      myCharacter.calculateBonusSpells(myCharacter.getStat('int'));
      myCharacter.prepareSpell('wizard', '0', 'Light');
      myCharacter.prepareSpell('wizard', '0', 'Acid Splash');
      myCharacter.prepareSpell('wizard', '1', 'Grease');
      expect(spellSlots['wizard']).to.be.an('array');
      expect(myCharacter.getSpellsKnown()['wizard']['2'][1]).to.exist;
      expect(myCharacter.getSpellsPrepared()['wizard']['0'][0]).to.equal('Light');
      expect(myCharacter.getSpellsPrepared()['wizard']['0'][1]).to.equal('Acid Splash');
      expect(myCharacter.getSpellsPrepared()['wizard']['1'][0]).to.equal('Grease');
      myCharacter.castSpell('wizard', '1', 'Grease');
      expect(myCharacter.getSpellsPrepared()['wizard']['1'][0]).to.be.undefined;
    });
  });

  describe('#validate()', function() {
    it('validate a character is good', function() {
      var errs = character.validate()
      expect(errs).to.be.null;
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