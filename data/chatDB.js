var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
var mongoose = require("mongoose");

var url = "mongodb://localhost:27017/chat";
var connect = MongoClient.connect(url);

mongoose.Promise = global.Promise;
mongoose.connect(url);

var User = require("../admin/userModel");

module.exports = {
    connect,
    User,
    close: function () {
        connect.then(db => db.close());
        mongoose.disconnect();
    }

};

/* close: function(callback){
 connect.then(db => {
 db.close();
 callback();
 })
 }*/
