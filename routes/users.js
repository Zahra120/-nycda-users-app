var express = require('express');
var fs = require('fs');
var pug = require('pug');
var userStore = require('./../userStore.js');

var router = express.Router();

router.get('/', function(req, res){
   res.send(pug.renderFile('views/users/adduser.pug'));
});

router.post('/', function(req, res){
   userStore.addUser(req.body);
   res.redirect('/users');


});
module.exports = router;
