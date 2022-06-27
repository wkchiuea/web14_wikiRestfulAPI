
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


// Request targeting all articles
app.route("/articles")

.get((req, res) => {
    Article.find(function(err, foundArticles) {
        if (!err) {
            res.send(foundArticles);
        } else {
            res.send(error);
        }
    });
})

.post((req, res) => {
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
})

.delete((req, res) => {
    Article.deleteMany(function(err) {
        res.send((!err) ? "Successfully deleted all articles." : err);
    })
});


// Request targeting specific article
app.route("/articles/:articleTitle")

.get((req, res) => {
    Article.findOne({title: req.params.articleTitle}, (err, foundArticle) => {
        if (foundArticle) {
            res.send(foundArticle);
        } else {
            res.send("No articles matching that title was found.");
        }
    });
})

.put((req, res) => {
    Article.replaceOne(
        {title: req.params.articleTitle},
        req.body,
        function(err) {
            if (!err) {
                res.send("Successfully updated article");
            }
        }
    );
})

.patch((req, res) => {
    Article.updateOne(
        {title: req.params.articleTitle},
        req.body,
        function(err) {
            if (!err) {
                res.send("Successfully updated article");
            }
        }
    );
})

.delete((req, res) => {
    Article.deleteOne({title: req.params.title}, function(err) {
        if (!err) {
            res.send("Successfully deleted article");
        }
    });
});


app.listen(3000, function() {
    console.log("Server started on port 3000.");
});
