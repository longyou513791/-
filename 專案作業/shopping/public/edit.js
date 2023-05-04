$(function() {
    $("form").on("submit", function(event) {
      event.preventDefault();
      $.ajax({
        type: 'PUT',
        data: {
            title:$("#title").val(),
            content:$("#body").val(),
        },
        url:  '/api/guestbook',
        error: function() {
        },
        success: function(data) {
          if(data.success==true){
            location="/";
          }
        } 
      });//ajax
    });
  });