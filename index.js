   var express = require('express'),
      fs = require('fs'),
      pug = require('pug'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      app = express();
      var userRouter = require('./routes/users');
      var searchRouter = require('./routes/search');
      var userStore = require('./userStore.js');


   app.use(express.static('public'));

   app.use(morgan('dev'));
   app.use(bodyParser.urlencoded({ extended: false }));
   app.use('/users', userRouter);
   app.use('/search', searchRouter);


   //Create one route: route 1: renders a page that displays all your users.
   app.get('/', function(req,res){
      res.send(pug.renderFile('views/users/index.pug', { users: userStore.getUsers() }));
   });

   app.get('/api/search/:query', function(req, res)  {
      var result = userStore.searchUsers(req.params.query);
      res.json(result);
   });


   app.listen(3000, function(){

     console.log('Web server is now running on port 3000');

   });
