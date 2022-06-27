
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







app.listen(3000, function() {
    console.log("Server started on port 3000.");
});
