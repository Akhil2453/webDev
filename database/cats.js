var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var george = new Cat({
//     name: "Akhil",
//     age: 1,
//     temperament: "Grouchy"
// });

// george.save(function(err, cats){
//   if(err){
//       console.log(err);
//   } else {
//       console.log(cats);
//   }
// });

Cat.find({}, function(err, cats){
    if(err){
        console.log(err);
    } else {
        console.log(cats);
    }
});