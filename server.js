var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var routes = require('./routes');
app.use(routes);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});