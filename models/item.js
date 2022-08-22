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
    number: {
        type: Number,
        require: true
    }
})
module.exports = mongoose.model("Item", itemSchema)