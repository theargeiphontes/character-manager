var BPromise = require('bluebird');
var fs = BPromise.promisifyAll(require('fs'));
var path = require('path');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var should = chai.should();
var assert = chai.assert;

var DB = require('../../src/models/DBFileRead.js');

describe('db', function() {
  var dbLoad;
  var dbPath;
  var dbJSON;

  beforeEach(function() {
    dbLoad = new DB();

    dbPath = path.resolve(__dirname + '/../../src/data') + '/';
    dbJSON = 'pathfinder.json';
  });

  describe('Working as Intended', function() {
    it('read and save file', function() {
      return dbLoad.loadDB(dbPath, dbJSON)
        .then(function(json) {
          json[0].name.should.equal('George');
          json[1].stats.should.have.property('str', '12');
          dbLoad.writeDB(dbPath, 'new' + dbJSON, json);
        })
        .catch(function(err) {
          console.error('Err =( ++ ' + err);
        })
        .finally(function() {
          fs.unlinkAsync(dbPath + 'new' + dbJSON);
        });
    });
  });

  describe('Failure as Intended', function() {
    it('should fail to read due to bad path', function() {
      return dbLoad.loadDB('a/terrible/path/to/follow/', dbJSON)
      .then(assert.fail)
      .catch(function(err) {
        assert.include(err.message, 'Could not read');
      });
    });
    
    it('should fail to write due to bad path', function() {
      var failJSON = {
        "fail": "boat"
      }

      return dbLoad.writeDB('a/terrible/path/to/follow/', dbJSON, failJSON)
        .then(function(err) {
          assert.include(err.message, 'Could not write');
        });
    });
  });
});