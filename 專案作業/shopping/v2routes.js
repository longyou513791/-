var express = require("express");
const api = require("./apiroutes");
var api=express.Router();

api.get("/", function(request, response) {
  response.render("index2");
});

api.get("/edit-entry/:title", function(req, res) {
    var entryIndex=-1;
    var entries=req.app.locals.entries;
    for(var i=0;i<entries.length;i++){
        if(entries[i].title==req.params.title){
          entryIndex=i;
        }
    }
    if(entryIndex!=-1)
      res.render("edit-entry", 
                { title:req.params.title,
                  content: entries[entryIndex].content });
    else 
      res.status(404).render("404");
  });

module.exports = api;