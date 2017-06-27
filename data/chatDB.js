var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
var mongoose = require("mongoose");

url = "mongodb://localhost:27017/chat";
var connect = MongoClient.connect(url);
var connectMongoose = mongoose.connect(url)

var User = require("../admin/userModel");

module.exports = {
    connect,
    connectMongoose,
    User

};

/* close: function(callback){
 connect.then(db => {
 db.close();
 callback();
 })
 }*/
