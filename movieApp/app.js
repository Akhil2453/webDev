var express = require("express");
var app = express();
var request = require("request");
    
app.set("view engine", "ejs");

//Home page(Search page in this case)
app.get("/", function(req,res){
    res.render("search");
});

//Display page for search results
app.get("/display", function(req,res){
   var query = req.query.search;
   var url = "http://omdbapi.com/s?=" + query + "&apikey=thewdb";
   
   request(url, function(error, response, body){
       if(!error && response.statusCode == 200){
           var data = JSON.parse(body);
           res.render("display", {data : data});
       }
   })
});



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Sever has Started!!!!") ;
});