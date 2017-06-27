var users = require(__dirname + "/users.json");

var mongoose = require("mongoose");

var url = "mongodb://localhost:27017/chat";
mongoose.connect(url)
    .then(importUsers);

function importUsers(){

    var userSchema = new mongoose.Schema({

        alias: String,
        roles: [String]

    });

    var User = mongoose.model("User", userSchema);

    User.insertMany(users)
        .then(() => console.log("inserted!"));

}

/*

MongoClient.connect(url, function (error, db){

    db.collection("rooms").find().toArray(function(error, rooms){
        if(error){
            console.error(error);
            return;

        }
        console.log(rooms);
        db.close();
    });
});   */

