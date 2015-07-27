var expect = require('chai').expect;
var Character = require('../../src/models/Character.js');

var __id = 0;
var __charData = {
  'name': 'Ian',
  'game': 'test'
};

describe('character', function() {
  var character;

  beforeEach(function() {
    character = new Character(__id, __charData);
  });

  describe('#get()', function() {
    it('fetch character data', function() {
      var id = character.getId();
      var name = character.get('name');
      var game = character.get('game');
      var rawData = character.getJSON();
      
      expect(id).to.equal(__id);
      expect(name).to.equal(__charData['name']);
      expect(game).to.equal(__charData['game']);
      expect(rawData).to.equal(__charData);
    });

    it('fail to get malformed field name', function() {
      expect(character.get('wrongKey')).to.be.undefined;
    });
  });

  describe('#set()', function() {
    it('successfully set character data', function() {
      character.set('name', 'Odin');
      character.set('game', 'unit');

      var name = character.get('name');
      var game = character.get('game');

      // TODO: why does my character model point directly at my JSON?
      //expect(name).to.not.equal(__charData['name']);

      expect(name).to.equal('Odin');
      expect(game).to.equal('unit');
    });
    
    it('successfully set character data and get raw data', function() {
      var __data = {
        'name': 'Ian',
        'game': 'test'
      };

      character.set('name', 'Odin');
      character.set('game', 'unit');

      var name = character.get('name');
      var game = character.get('game');
      var rawData = character.getJSON();
      
      expect(game).to.not.equal('Ian');
      expect(game).to.not.equal('test');
      expect(rawData).to.not.equal(__data);
    });

    it('fails to set data due to wrong field name', function() {
      expect(character.set('wrongKey', 'myBad')).to.be.undefined;
    });
  });
});