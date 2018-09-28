var express = require("express"),
    app = express(),
    bodyP = require("body-parser"),
    methodO = require("method-override"),
    expressSanit = require("express-sanitizer"),
    mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyP.urlencoded({extended : true}));
app.use(methodO("_method"));
app.use(expressSanit());

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

//NEW route
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//CREATE route
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if (err){
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

//SHOW route
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, findBlog){
        if (err){
            console.log(err);
        } else {
            res.render("show", {blog : findBlog});
        }
    });
});

//EDIT route
app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err, findBlog){
        if (err){
            res.redirect("/");
        } else {
            res.render("edit", {blog : findBlog});
        }
    });
});

//UPDATE route
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, uBlog){
        if(err){
            res.redirect("/");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DESTROY route
app.delete("/blogs/:id", function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err, blog){
        if(err){
            res.redirect("/blogs");
        } else {
            blog.remove();
            res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Blog Sever Running-------------");
});