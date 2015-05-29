var fs = require('fs');

var DBFileRead = function () {
  // load db here?
};

DBFileRead.prototype.loadDB = function (path, filename) {
  console.log('loadDB path >> ' + path + filename);
  /*fs.readFile(path + filename, function (err, json) {
    if(err) { throw err; }
    return JSON.parse(json);
  });*/
  return JSON.parse(fs.readFileSync(path + filename));
};

DBFileRead.prototype.writeDB = function (path, filename, json) {
  fs.writeFile(path + filename, json, 
    function (err) {
      if(err) { throw err; }
      console.log('Char saved');
    }
  );
};

module.exports = DBFileRead;