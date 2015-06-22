var BPromise = require('bluebird');
var fs = BPromise.promisifyAll(require('fs'));

var DBFileRead = function () {
  // load db here?
};

DBFileRead.prototype.loadDB = function (path, filename) {
  return fs.readFileAsync(path + filename, 'utf8')
            .then(JSON.parse)
            .then(function(file) {
              console.log(file);
            }).catch(function(err) {
              console.error('bad read! >> ' + err);
            });
};

DBFileRead.prototype.writeDB = function (path, filename, json) {
  fs.writeFile(path + filename, json, function (err) {
      if(err) { throw err; }
      console.log('Char saved');
    }
  );
};

module.exports = DBFileRead;