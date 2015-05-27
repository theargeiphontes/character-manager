var fs = require('fs');

var DBFileRead = function (path, filename) {
    this.DBFile = loadDB(path, filename);
};

DBFileRead.prototype.loadDB = function (path, filename) {
  console.log('__dirname >> ' + __dirname);
  fs.readFile(__dirname + path + filename, function (err, json) {
    if(err) { throw err; }
    console.log (JSON.parse(json));
  });
  console.log ('null');
};

module.exports = DBFileRead;