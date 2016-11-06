var express = require('express');
var fs = require('fs');
var pug = require('pug');


var router = express.Router();
var userStore = require('./../userStore');





   router.get('/', function(req, res){
      res.send(pug.renderFile('views/search/search.pug'));
   });

   router.get('/:query', function(req, res){
      var multiResult = userStore.searchUsers(req.params.query);
      res.send(pug.renderFile('views/users/user.pug', { result: multiResult }));
   });

   router.post('/', function(req, res){
      res.redirect('/search/' + req.body.query);
   });




   module.exports = router;
