var expect = require('chai').expect;
var path = require('path');
var sinon = require('sinon');

var PathfinderCharacter = require('../../src/models/PathfinderCharacter.js');
var PathfinderDBHelper = require('../../src/helpers/PathfinderDBHelper.js');

var georgeID = 0;
var georgeJSON = {
  'name': 'George',
  'game': 'pathfinder',
  'stats': {
    'str': '8',
    'dex': '15',
    'con': '12',
    'int': '14',
    'wis': '10',
    'cha': '16'
  },
  'class': {
    'monk': '5'
  }
};
var danID = 1;
var danJSON = {
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
    'wizard': '18'
  }
};

describe('pathfinder DB helper', function() {
  var george;
  var dan;
  var dbPath
  var dbJSON
  var helper;

  var mock;
  var fakeData = [];

  beforeEach(function() {
    helper = new PathfinderDBHelper();

    george = new PathfinderCharacter(georgeID, georgeJSON);
    dan = new PathfinderCharacter(danID, danJSON);

    dbPath = path.resolve(__dirname + '/../../src/data') + '/';
    dbJson = 'pathfinder.json';

    //mock = sinon.mock(PathfinderCharacter); 
  });

  describe('#save()', function() {
    it('as intended', function() {
      expect(true).to.be.false;
    }); 
  });
});