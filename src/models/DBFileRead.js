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
              throw new Error('Bad file read >> ' + err);
            });
};

DBFileRead.prototype.writeDB = function (path, filename, json) {
  fs.writeFileAsync(path + filename, JSON.stringify(json, null, 4))
    .then(function() {
      console.log('File saved');
    })
    .catch(function(err) {
      throw new Error('Bad file write >> ' + err);
    }).done();
};

module.exports = DBFileRead;