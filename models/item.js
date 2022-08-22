const mongoose = require("mongoose")
const Schema = mongoose.Schema
const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date:{
        type:Date,
        required: true
    },
    category: {
        type: String,
        require: true
    }
})
module.exports = mongoose.model("Item", itemSchema)