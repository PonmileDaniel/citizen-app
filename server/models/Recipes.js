const mongoose = require("mongoose");
const Schema = mongoose.Schema
const recipesSchema = new mongoose.Schema({
   name: {
    type: String,
    required: "This field is Required."
   },
   description: {
    type: String,
    required: "This field is Required."
   },
   email: {
    type: String,
    required: "This field is Required."
   },
   ingredient: {
    type: Array,
    required: "This field is Required."
   },
   category: {
    type: String,
    enum: ['Thai', 'Chinese' , 'America', 'Nigeria', 'India'],
    required: "This field is Required."
   },
   image: {
    type: String,
    required: "This field is Required."
   },
   
});
recipesSchema.index({ name: "text", description: "text", category:"text" });

const Recipes = mongoose.model("Recipes", recipesSchema);
module.exports = Recipes;












