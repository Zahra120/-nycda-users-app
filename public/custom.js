
$('#searchNav').on('keyup', function() {
   var query = $(this).val();

   $.get('/api/search/' + query, function(body){

      body.forEach(function(element) {
       $('.search-results').append(
         '<li>' + element.firstname + ' ' +
          element.lastname + '</li>'
       );
     });

      });


   });
