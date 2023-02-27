const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    email : {type : String, require : true},
    password : {type : String, require : true}
}, {timestamps : true})

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;