const mongoose = require("mongoose");
const Schema = mongoose.Schema
const categorySchema = new mongoose.Schema({
   name: {
    type: String,
    required: "This field is Required."
   },
   image: {
    type: String,
    required: "This field is Required."
   },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;