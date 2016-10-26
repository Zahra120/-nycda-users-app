var express = require('express');
var fs = require('fs');
var pug = require('pug');
var app =  express();

var users = JSON.parse(fs.readFileSync('users.json'));
//Create one route: route 1: renders a page that displays all your users.
app.get('/', function(req,res){

   res.send(pug.renderFile('views/index.pug',{ users : users }));


});

app.listen(3000,function(){

  console.log('Web server is now running on port 3000');

});
