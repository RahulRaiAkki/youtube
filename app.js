var express = require("express");
var app = express();
const cors = require('cors');
const youtube = require('./youtube');

app.use(cors());


app.get("/getList", (req, res, next) => {
    youtube.getList(req,res);
});

app.get("/videoDetails/:id", (req, res, next) => {
    youtube.getVideoDetails(req,res);
});
app.get("/saveList", (req, res, next) => {
    youtube.saveList(req,res);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});