var express = require("express"),
    app = express(),
    bodyP = require("body-parser"),
    mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyP.urlencoded({extended : true}));

mongoose.connect("mongodb://localhost:27017/blogApp", { useNewUrlParser: true });

//ADD Schema for storing blog in data base
var blogSchema = new mongoose.Schema ({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});

//CREATE Databse model
var Blog = mongoose.model("Blog", blogSchema);

//Temp data in Blog DB
// Blog.create({
//     title: "Test Post",
//     image: "https://images.unsplash.com/photo-1538000416583-35c50e541862?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a860997bc839a5afc470a51cb5fa9ac1&auto=format&fit=crop&w=500&q=60",
//     body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
// });

// Create home page get request
app.get("/", function(req, res){
    res.redirect("/blogs");
});

//INDEX route
app.get("/blogs", function(req, res){
    //fetch info from DB
    Blog.find({}, function(err, blogs){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("index", {blogs : blogs});
        }
    });
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Blog Sever Running-------------");
});