/**
 * Created by Abe on 25/06/2017.
 */

// todo move to a global place to configure mongoose
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

var schemaOptions = {
    collection: "users",

};

var schema = new mongoose.Schema({
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
}, schemaOptions);



module.exports = mongoose.model("model", schema);