var chai = require('chai');
var character = require('../../src/models/Character.js');

var expect = chai.expect();

var __charData = {
    'name': 'Ian',
    'game': 'test'
};
__charData = JSON.parse(__charData);

describe('character', function() {
  var character;

  beforeEach(function() {
    character = new Character(__charData);
  });

  describe('#get()', function() {
    it('fetch character data', function() {
      var name = character.get('name');
      var game = character.get('game');
      var rawData = character.getJSON();
      
      expect(name).to.equal(__charData[name]);
      expect(game).to.equal(__charData[game]);
      expect(rawData).to.equal(__charData);
    });

    it('fail to get malformed field name', function() {
      expect(character.get('wrongfield')).to.throw('Data not found');
    });
  });

  describe('#set()', function() {
    it('successfully set character data', function() {
      character.set('name', 'Odin');
      character.set('game', 'unit');

      var name = character.get('name');
      var game = character.get('game');

      expect(name).to.not.equal(__charData[name]);
      expect(game).to.not.equal(__charData[game]);
    });
    
    it('successfully set character data and get raw data', function() {
      character.set('name', 'Odin');
      character.set('game', 'unit');

      var name = character.get('name');
      var game = character.get('game');
      var rawData = character.getJSON();
      
      expect(name).to.not.equal(__charData[name]);
      expect(game).to.not.equal(__charData[game]);
      expect(rawData).to.not.equal(__charData);
    });

    it('fails to set data due to wrong field name', function() {
      expect(character.set('wrongField', 'myBad')).to.throw('Field not found');
    });
  });
});