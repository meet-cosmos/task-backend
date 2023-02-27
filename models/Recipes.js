const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const RecipeSchema = new Schema({
    title : {type : String, require : true},
    author : {type : String, require : true},
    file : {type : String, require : true},
    ingredients : {type : String, require : true},
    directions : {type : String, require : true},
    user : {type : ObjectId, ref : "user"}
}, {timestamps : true})

const RecipeModel = mongoose.model("Recipe", RecipeSchema);

module.exports = RecipeModel;