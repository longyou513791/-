function showEntries(entries){
    var $list = $("#booklist");
    $list.empty();
    entries.forEach((entry)=>{
        var $panel = $("<div>").addClass("panel")
                               .addClass("panel-default");
        var $heading=$("<div>").addClass("panel-heading");
        $heading.text(entry.title);

        var $editBtn=$("<a class='btn btn-xs btn-warning pull-right editbtn'>").text("Edit");
        var $deleteBtn=$("<a class='btn btn-xs btn-danger pull-right delbtn'>").text("Delete");

        $heading.append($deleteBtn).append($editBtn);

        $panel.append($heading);

        var $published=$("<div class='text-muted pull-right'>");
        $published.text(entry.published);
        var $post=$("<div>").text(entry.content);
        $post.addClass("panel-body").append($published);
        $panel.append($post);

        $list.append($panel);
  })  
  }
  function reload(){
    $.ajax({
        type: 'GET',
        url:  '/api/guestbook',
        error: function() {
        },
        success: function(data) {
          //if(data.success) console.log(data.entries);
          if(data.success) {
            showEntries(data.entries);
            attachEvent();
            }
        } 
      });
  }
  function attachEvent(){
    $(document).on('click', '.delbtn', function(event){
      $.ajax({
        type: 'DELETE',
        data: {
          title:$(this).parent().contents().get(0).nodeValue
        },
        url:  '/api/guestbook',
        error: function() {

        },
        success: function(data) {
          if(data.success==true){
              alert("Deleted!");
              reload();
          }
        } 
      });//ajax
    });
    $(document).on('click', '.editbtn', function(event){
        var title=$(this).parent().contents().get(0).nodeValue; 
        location="/edit-entry/"+title;
    });
}
  $(function() {
    var $list = $("#booklist");
    reload();
  });