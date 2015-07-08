var expect = require('chai').expect;
var DB = require('../../src/models/DBFileRead.js');
var BPromise = require('bluebird');

var dbPath = '/Users/iames/code/character-manager/src/data/';
var dbJson = 'pathfinder.json';
var dbLoad = new DB();

describe('db', function() {
  describe('#read()', function() {
    it('shoudld read file', function(done) {
      BPromise.join(dbLoad.loadDB(dbPath, dbJson), function(data) {
        expect(data[0].name).to.equal('George');
        expect(data[1].name).to.equal('Dan');
      }).done();
      done();
    });
  });
});