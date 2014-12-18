var express = require('express');
var jade = require('jade');
var fs = require('fs');

var app = express();
 
app.get('/', function(req, res) {
    var html = jade.renderFile(__dirname + '/templates/index.html');
    res.send(html);
});

app.get('/pathfinder', function(req, res) {
  fs.readFile(__dirname + '/../data/pathfinder.json', function(err, data) {
    res.send(data);
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
 
console.log('Server running on port 3000.');