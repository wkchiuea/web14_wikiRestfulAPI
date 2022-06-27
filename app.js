
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});
const articleParser = new mongoose.Schema({
    title: String,
    content: String
});
const Article = mongoose.model("Article", articleParser);



app.get("/articles", (req, res) => {
    Article.find(function(err, foundArticles) {
        if (!err) {
            res.send(foundArticles);
        } else {
            res.send(error);
        }
    });
});

app.post("/articles", (req, res) => {
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save((err) => {
        if (!err) {
            res.send("Successfully added a new article.");
        } else {
            res.send(err);
        }
    });
});

app.delete("/articles", (req, res) => {
    Article.deleteMany(function(err) {
        res.send((!err) ? "Successfully deleted all articles." : err);
    })
});




app.listen(3000, function() {
    console.log("Server started on port 3000.");
});
