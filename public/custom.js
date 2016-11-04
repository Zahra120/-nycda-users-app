
$('#searchNav').on('keyup', function(event) {

   var $input = $(event.currentTarget);
   var query = $input.val();



   $.get('/api/search/' + query, function(body){

      body.forEach(function(element) {
       $('.in-application-search-results').append(
         '<li>' + element.firstname + ' ' +
          element.lastname + '</li>'
       );
     });

      });


   });
