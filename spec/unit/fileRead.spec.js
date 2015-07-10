var DB = require('../../src/models/DBFileRead.js');
var BPromise = require('bluebird');
var path = require('path');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

//console.log(chai);
chai.use(chaiAsPromised);
var expect = chai.expect();
var should = chai.should();

//console.log(chai);
//console.log('should >> ' + should);

var dbLoad = new DB();

var dbPath = path.resolve(__dirname + '/../../src/data') + '/';
var dbJson = 'pathfinder.json';

describe('db', function() {
  describe('#read()', function() {
    it('should read file', function(done) {
      dbLoad.loadDB(dbPath, dbJson)
        .then(function(data) {
          expect(data[0].name).to.equal('George');
          expect(data[1].stats).to.have.property('str', '12');
      }).catch(done());
    });
  });

  // TODO: make it work
  describe('#failRead()', function() {
    it('should fail to read due to bad path', function(done) {
       return expect(dbLoad.loadDB('a/terrible/path/to/follow/', dbJson)).should.be.rejected.and.notify(done);
    });
  });
});