var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
const $ = require('jquery');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var path    = require("path");
var people = [{name: "Kevin", amount: 16.00}, {name: "Brian", amount: 47.00}, {name: "Michael", amount: 12.00}];

app.get('/', function (req, res) {
  var html = fs.readFileSync('./views/index.html', 'utf8');
  res.send(html);
});

app.get('/non-modular', function (req, res) {
  res.sendFile(path.join(__dirname+'/non-modular/index.html'));
});

app.get('/non-modular/scripts.js', function (req, res) {
  var string = fs.readFileSync('./non-modular/scripts.js');
  res.send(string);
});

app.get('/modular', function (req, res) {
  res.sendFile(path.join(__dirname+'/modular/index.html'));
});

app.get('/modular/scripts.js', function (req, res) {
  var string = fs.readFileSync('./modular/scripts.js');
  res.send(string);
});

app.post('/people', function (req, res) {
  var newPerson = {name: req.body.name, amount: req.body.amount};
  people[people.length + 1] = newPerson;
  res.status(200).send(newPerson);
  console.log("Added new person:", req.body);
})

app.get('/people', function (req, res) {
  res.status(200).send(people);
})

app.get('/code/:type', function (req, res) {
  console.log("requested code: ", req.params.type);
  var js_path = `${__dirname}/${req.params.type}/scripts.js`;
  var html_path = `${__dirname}/${req.params.type}/index.html`;
  var js = fs.readFileSync(js_path, 'utf8');
  var html = fs.readFileSync(html_path, 'utf8');
  res.send({html: html, js: js})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// ORGANIZE THIS CODE WITH THIS EXAMPLE:
// https://github.com/expressjs/express/blob/master/examples/route-separation/index.js












