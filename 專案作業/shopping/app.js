var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.resolve(__dirname, "public")));

var entries = [];
var cart = ["iphone","time","earrings","energe","earphone","wind"];
var list =["iphone","小米手錶","耳環","小米行充","耳機","吹風機"];
var cost = [32500,625,400,799,899,799];

app.locals.entries = entries;

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "images")));

app.get("/", function(request, response) {
  response.render("index");
});


app.get("/new-entry", function(request, response) {
  response.render("new-entry");
});
app.get("/cart", function(request, response) {
  response.render("cart");
});
app.post("/new-entry", function(request, response) {
  if (!request.body.products || !request.body.count) {
		response.status(400).send("Entries must have a title and a body.");
		return; 
	}
  var cur;
  for(var i=0;i<list.length;i++)
  {
    if(request.body.products==cart[i])
      cur=i;
  }
  var spend=parseInt(request.body.count,6)*cost[cur];

	entries.push({
    product:list[cur],
    count: request.body.count,
    spend:spend,
	});

  response.redirect("/");
});

app.post("/cart", function(request, response){
  if(request.body.ra=="cash"){
    response.status(200).send("已成功結帳!ˊ_>ˋ");
    return;
  }
});
app.delete("/cart",function(request,response){
  
});

var api = require('./apiroutes'); 
app.use('/api', api);


app.use(function(request, response) {
  response.status(404).render("404");
});

app.use(function(request, response) {
  response.status(404).render("404");
});
 
http.createServer(app).listen(3000, function() {
  console.log("Guestbook app started on port 3000.");
});

