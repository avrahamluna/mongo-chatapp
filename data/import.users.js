var users = require(__dirname + "/users.json");
var chatDB = require("./chatDB");

chatDB.connectMongoose.then(importUsers);

function importUsers(){


    chatDB.User.insertMany(users)
        .then(() => {
            console.log("inserted!")
        mongoose.disconnect();
})
.catch(error => {
   console.error(error);
});
}


