var express = require("express"),
    app = express(),
    request = require("request");

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Sever has Started!!!!") ;
});