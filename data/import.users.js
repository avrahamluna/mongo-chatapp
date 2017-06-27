var users = require(__dirname + "/users.json");
var User = require("../admin/userModel");
var chatDB = require("./chatDB");

chatDB.connectMongoose.then(importUsers);

function importUsers(){



    User.insertMany(users)
        .then(() => {
            console.log("inserted!")
        mongoose.disconnect();
})
.catch(error => {
   console.error(error);
});
}


