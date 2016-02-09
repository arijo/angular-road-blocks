var express = require('express');
var app = express();

var Work = require('./app/work.js');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

Work.parse(__dirname + '/data.xml', function(works) {
  __works = works;
});

app.get('/work.json', function (req, res) {
  res.send(Work.search(JSON.parse(req.query.filters)));
});

app.get('*', function (req, res) {
  res.sendStatus(404);
});

app.listen(30000, function () {
  console.log('Example app listening on port 30000!');
});
