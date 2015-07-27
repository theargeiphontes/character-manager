var DB = require('../../src/models/DBFileRead.js');
var BPromise = require('bluebird');
var path = require('path');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var should = chai.should();
var assert = chai.assert;
var expect = chai.expect;


var dbLoad = new DB();

var dbPath = path.resolve(__dirname + '/../../src/data') + '/';
var dbJson = 'pathfinder.json';

describe('db', function() {
  describe('#read()', function() {
    it('should read file', function() {
      return dbLoad.loadDB(dbPath, dbJson)
              .then(function(data) {
              data[0].name.should.equal('George');
              data[1].stats.should.have.property('str', '12');
            });
    });

    it('should fail to read due to bad path', function() {
      return dbLoad.loadDB('a/terrible/path/to/follow/', dbJson)
      .then(assert.fail)
      .catch(function(err) {
        assert.include(err.message, 'Bad file read');
      });
    });
  });

  /*describe('#write()' function() {
    it('should save file', function() {
     return dbLoad.writeDB(dbPath, dbJson, )
    });
  });*/
});