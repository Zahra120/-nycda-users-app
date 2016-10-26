var express = require('express');
var fs = require('fs');
var pug = require('pug');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app =  express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));


var users = JSON.parse(fs.readFileSync('users.json'));
var findUser = function(firstname){
   for (var i=0; i < users.length; i++){
      if(users[i].firstname === firstname)
         return users[i];
   }
};
// //Create one route: route 1: renders a page that displays all your users.
app.get('/', function(req,res){

   res.send(pug.renderFile('views/index.pug', { users: users }));


});

//route 2: renders a page that displays a form which is your search bar.

app.get('/search', function(req, res){
   res.send(pug.renderFile('views/search.pug'));
});

//route 3: takes in the post request from your form, then displays matching users
//on a new page. Users should be matched based on whether either their first or last name contains the input string.
app.get('/search/*', function(req, res){
   var foundUser = findUser(req.params[0]);
   res.send(pug.renderFile('views/user.pug', { user: foundUser }));
});
app.post('/searchform', function(req, res){
   console.log('post request on search page');
   res.redirect('/search/' + req.body.first_name);
});



app.listen(3000, function(){

  console.log('Web server is now running on port 3000');

});
