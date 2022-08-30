const mongoose = require("mongoose")
const Schema = mongoose.Schema
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        require:true
    }
})
module.exports = mongoose.model("Category", categorySchema)