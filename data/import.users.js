var users = require(__dirname + "/users.json");
var mongoose = require("mongoose");

var url = "mongodb://localhost:27017/chat";
mongoose.connect(url)
    .then(importUsers);

function importUsers(){

mongoose.Promise = global.Promise;

    var userSchemaOptions = {
        collection: "chatusers",

    };

    var userSchema = new mongoose.Schema({
        alias: String,
        roles: [String],
        contact: {
            phone: String,
            email: String

        },
        address: {
            lines: [String],
            city: String,
            state: String,
            zip: Number
        }
    }, userSchemaOptions);

    var User = mongoose.model("User", userSchema);

    User.insertMany(users)
        .then(() => {
            console.log("inserted!")
        mongoose.disconnect();
})
.catch(error => {
   console.error(error);
});
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

