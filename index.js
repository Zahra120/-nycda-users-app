   var express = require('express'),
      fs = require('fs'),
      pug = require('pug'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      app = express();

   app.use(express.static('public'));

   app.use(morgan('dev'));
   app.use(bodyParser.urlencoded({ extended: false }));

   var usersData = JSON.parse(fs.readFileSync('users.json'));
   // var findUser = function(query){
   //    var result = [];
   //    for (var i=0; i < users.length; i++){
   //       if (users[i].firstname.toLowerCase().includes(query.toLowerCase()) || users[i].lastname.toLowerCase().includes(query.toLowerCase())){
   //          result.push(users[i]);
   //       }
   //    }
   //
   //    return result;
   // };
      function findUser(input){
         var result = [];
         for(var i = 0; i < usersData.length; i++){
            if ( searchFirstName(input, usersData[i]) || searchLastName(input, usersData[i])){
                result.push(usersData[i]);

            }
         }
         return result;
      }
      function searchFirstName(input, user){
         return user.firstname.toLowerCase().includes(input.toLowerCase());
      }
      function searchLastName(input, user){
         return user.lastname.toLowerCase().includes(input.toLowerCase());
      }


   //Create one route: route 1: renders a page that displays all your users.
   app.get('/', function(req,res){
      res.send(pug.renderFile('views/users/index.pug', { users: usersData }));
   });

   //route 2: renders a page that displays a form which is your search bar.

   app.get('/search', function(req, res){
      res.send(pug.renderFile('views/search/search.pug'));
   });

   //route 3: takes in the post request from your form, then displays matching users
   //on a new page. Users should be matched based on whether either their first or last name contains the input string.
   app.get('/search/*', function(req, res){
      var multiResult = findUser(req.params[0]);
      res.send(pug.renderFile('views/users/user.pug', { result: multiResult }));
   });

   app.get('/api/search/:query', function(req, res)  {
      var result = findUser(req.params.query);
      res.json(result);
   });

   app.post('/searchform', function(req, res){
      res.redirect('/search/' + req.body.query);
   });

   //route 4: renders a page with three forms on it (first name, last name, and email)
   //that allows you to add new users to the users.json file.
   app.get('/adduser', function(req, res){
      res.send(pug.renderFile('views/users/adduser.pug'));
   });

   app.post('/adduser', function(req, res){

         usersData.push({
         firstname: req.body.firstname,
         lastname: req.body.lastname,
         email: req.body.email
      });
   //route 5: takes in the post request from the 'create user' form, then adds the
   //user to the users.json file. Once that is complete, redirects to the route that displays all your users (from part 0)

      fs.writeFileSync('users.json', JSON.stringify(usersData));
      res.redirect('/');
   });
   app.post('/search', function(req, res){
      res.redirect('/search/'+ req.body.query);
      // res.redirect('/search/'+ req.body.query) ;

   });



   app.listen(3000, function(){

     console.log('Web server is now running on port 3000');

   });
