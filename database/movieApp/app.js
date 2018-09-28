var express = require("express"),
    app = express(),
    request = require("requests");
    
app.set("view engine", "ejs");

//Home page(Search page in this case)


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Sever has Started!!!!") ;
});