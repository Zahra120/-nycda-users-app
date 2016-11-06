
var fs = require('fs');
var usersData = JSON.parse(fs.readFileSync('users.json'));
module.exports = {

   getUsers: function(){
      return usersData;
   },
   searchUsers: function findUser(input){
      var result = [];
      for(var i = 0; i < usersData.length; i++){
         if ( searchFirstName(input, usersData[i]) || searchLastName(input, usersData[i])){
             result.push(usersData[i]);
         }
      }
      return result;
   },
   addUser: function(userObj){
        usersData.push(userObj);
       fs.writeFileSync('users.json', JSON.stringify(usersData));
   }
};

function searchFirstName(input, user){
   return user.firstname.toLowerCase().includes(input.toLowerCase());
}

function searchLastName(input, user){
   return user.lastname.toLowerCase().includes(input.toLowerCase());
}
// var usersData = JSON.parse(fs.readFileSync('users.json'));
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
