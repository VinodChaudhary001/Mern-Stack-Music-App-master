const mongoose = require('mongoose');

// Define the schema for the categories table
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Example validation: required and unique
});

// Create the model for the categories table
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
