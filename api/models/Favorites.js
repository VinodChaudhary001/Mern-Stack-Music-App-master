const mongoose = require('mongoose');

// Define the schema for the categories table
const FavoritesSchema = new mongoose.Schema({
    song_id: { type: String, required: true, unique: true }, // Example validation: required and unique
});

// Create the model for the categories table
const Favorites = mongoose.model('Favorites', FavoritesSchema);

module.exports = Favorites;
