const mongoose = require("mongoose")
const Schema = mongoose.Schema
const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        require: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        require: true
    }
})
module.exports = mongoose.model("Item", itemSchema)