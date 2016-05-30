var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var path    = require("path");
var people  = require('./database');

router.get('/', function (req, res) {
  var html = fs.readFileSync('./non-modular/index.html', 'utf8');
  res.send(html);
});

router.get('/non-modular', function (req, res) {
  res.sendFile(path.join(__dirname+'/non-modular/index.html'));
});

router.get('/non-modular/scripts.js', function (req, res) {
  var string = fs.readFileSync('./non-modular/scripts.js');
  res.send(string);
});

router.get('/modular', function (req, res) {
  res.sendFile(path.join(__dirname+'/modular/index.html'));
});

router.get('/modular/scripts.js', function (req, res) {
  var string = fs.readFileSync('./modular/scripts.js');
  res.send(string);
});

router.post('/people', function (req, res) {
  var newPerson = {name: req.body.name, amount: req.body.amount};
  people[people.length + 1] = newPerson;
  res.status(200).send(newPerson);
  console.log("Added new person:", req.body);
});

router.get('/people', function (req, res) {
  res.status(200).send(people);
});

router.get('/code/:type', function (req, res) {
  var js_path = `${__dirname}/${req.params.type}/scripts.js`;
  var html_path = `${__dirname}/${req.params.type}/index.html`;
  var js = fs.readFileSync(js_path, 'utf8');
  var html = fs.readFileSync(html_path, 'utf8');
  res.send({html: html, js: js})
});

module.exports = router;