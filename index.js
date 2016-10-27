var express = require('express');
var fs = require('fs');
var pug = require('pug');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app =  express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

var users = JSON.parse(fs.readFileSync('users.json'));
var findUser = function(query){
   var result = [];
   for (var i=0; i < users.length; i++){
      if (users[i].firstname.toLowerCase().includes(query.toLowerCase()) || users[i].lastname.toLowerCase().includes(query.toLowerCase())){
         result.push(users[i]);
      }
   }

   return result;
};
// function findUser(input) {
//   for (i = 0; i < users.length; i++) {
//     if (searchFirstName(input, users[i]) || searchLastName(input, users[i])) {
//       return users[i];
//     }
//   }
// }
//
// function searchFirstName(input, user) {
//   return user.firstname.toLowerCase().includes(input.toLowerCase());
// }
//
// function searchLastName(input, user) {
//   return user.lastname.toLowerCase().includes(input.toLowerCase());
// }
//
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
   var result = findUser(req.params[0]);
   res.send(pug.renderFile('views/user.pug', { result: result }));
});
app.post('/searchform', function(req, res){
   console.log('post request on search page');
   res.redirect('/search/' + req.body.query);
});

//route 4: renders a page with three forms on it (first name, last name, and email)
//that allows you to add new users to the users.json file.
app.get('/adduser', function(req, res){
   res.send(pug.renderFile('views/adduser.pug'));

});

app.post('/adduser', function(req, res){
   console.log('post request on adduser page');
      users.push({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email
   });

   
   fs.writeFileSync('users.json', JSON.stringify(users));
   res.redirect('/');
});
//route 5: takes in the post request from the 'create user' form, then adds the
//user to the users.json file. Once that is complete, redirects to the route that displays all your users (from part 0)


app.listen(3000, function(){

  console.log('Web server is now running on port 3000');

});
