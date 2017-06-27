var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
var mongoose = require("mongoose");
url = "mongodb://localhost:27017/chat";
var connect = MongoClient.connect(url);


var connectMongoose = mongoose.connect(url)

module.exports = {
    connect,
    connectMongoose

};

/* close: function(callback){
 connect.then(db => {
 db.close();
 callback();
 })
 }*/
