var express = require("express"),
    app = express(),
    request = require("request");
    
app.set("view engine", "ejs");

//Home page(Search page in this case)
app.get("/", function(req,res){
    res.redirect("search");
});

//Display page for search results
app.get("/results", function(req,res){
   var query = res.query.search;
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