var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;

url = "mongodb://localhost:27017/chat";
var connect = MongoClient.connect(url);

module.exports = {
    connect,
    close: function(callback){
        connect.then(db => {
            db.close();
            callback();
        })
    }
};

