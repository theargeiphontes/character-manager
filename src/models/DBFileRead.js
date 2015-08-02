var BPromise = require('bluebird');
var fs = BPromise.promisifyAll(require('fs'));

var DBFileRead = function () {
  // load db here?
};

DBFileRead.prototype.loadDB = function (path, filename) {
  return fs.readFileAsync(path + filename, 'utf8')
          .then(JSON.parse)
          .then(function(file) {
            return file;
          }).catch(function(err) {
            throw new Error('Could not read ' + filename + ' from disk ' + err);
          });
};

DBFileRead.prototype.writeDB = function (path, filename, json) {
  return fs.writeFileAsync(path + filename, JSON.stringify(json, null, 4), 'utf8')
    .catch(function(err) {
      return new Error('Could not write ' + filename + ' to disk ' + err);
    });
};

module.exports = DBFileRead;