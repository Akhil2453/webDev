var express = require("express"),
    app = express(),
    bodyP = require("body-parser"),
    mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyP.urlencoded({extended : true}));

mongoose.connect("mongodb://localhost:27017/blogApp", { useNewUrlParser: true });



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Blog Sever Running-------------");
});