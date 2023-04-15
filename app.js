
import express from "express";
var app= express();

import { MongoClient, ObjectId, Timestamp } from "mongodb";

var i1=[];
import bodyParser from "body-parser";
//var mongoose = require('mongoose');

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const client = await MongoClient.connect("mongodb://127.0.0.1:27017")
const db = client.db("tododb")
const collection = db.collection("tasklist")



app.get("/", async function(req, res){
    const data = await collection.find().toArray()
        res.render("index",{newListItem:data});
});

app.post("/", function(req,res)
{
    var i=req.body.n;
     i1.push(i)
     collection.insertOne({
        task:i
     })
    res.redirect("/");
});



app.listen(3000, function (){
    console.log("listening on port 3000");
});
