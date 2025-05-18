const mongoose = require('mongoose');

// Define the schema for the songs table
const songSchema = new mongoose.Schema({
    favourite: { type: Boolean, default: false },
    category: { type: String },
    type: { type: String },
    songName: { type: String, required: true },
    artist: { type: String },
    song: { type: String },
    imgSrc: { type: String },
    color: { type: String }
});

// Create the model for the songs table
const Song = mongoose.model('Song', songSchema);

module.exports = Song;
