const Song = require('../models/Song');
const multer = require('multer');
const upload = require('../Middleware/uploadMiddleware'); // Import the Multer middleware
const fs = require('fs');
// Controller function to fetch all songs
exports.getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getSongDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id); // Use findById to fetch a song by ID
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//getSongDetails
// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure the directory exists and is writable by the server
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Add a unique identifier
  },
});

// Initialize multer with the configured storage
const uploadStorage = multer({ storage: storage });

// // Controller function to create a new song
exports.createSongs = async (req, res) => {
  try {
    // Handle potential errors during upload
    uploadStorage.fields([
      { name: 'song', maxCount: 1 },
      { name: 'imgSrc', maxCount: 1 }
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message }); // Use err.message for more details
      }

      // Extract fields from request body
      const { favourite, category, type, songName, artist, color } = req.body;

      // Check if uploaded files exist
      if (!req.files) {
        return res.status(400).json({ error: 'No files uploaded' });
      }

      // Extract file paths (assuming successful upload)
      const songFilePath = req.files['song'][0].path; // File path of the uploaded song
      const imgFilePath = req.files['imgSrc'][0].path; // File path of the uploaded image

      // Create new song object
      const song = new Song({ favourite, category, type, songName, artist, song: songFilePath, imgSrc: imgFilePath, color });

      // Save song to database
      const savedSong = await song.save();

      res.status(201).json(savedSong);
    });
  } catch (error) {
    // Handle other errors
    res.status(500).json({ error: error.message });
  }
};
// Controller function to create a new song


exports.updateSongDetails = async (req, res) => {
  try {
    // Handle potential errors during upload
    uploadStorage.fields([
      { name: 'song', maxCount: 1 },
      { name: 'imgSrc', maxCount: 1 }
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message }); // Use err.message for more details
      }

      // Extract fields from request body
      const { favourite, category, type, songName, artist, color } = req.body;

      // Check if uploaded files exist
      if (!req.files) {
        return res.status(400).json({ error: 'No files uploaded' });
      }

      // Extract file paths (assuming successful upload)
      const songFilePath = req.files['song'][0].path; // File path of the uploaded song
      const imgFilePath = req.files['imgSrc'][0].path; // File path of the uploaded image

      // Find the song by ID and update its details
      const updatedSong = await Song.findByIdAndUpdate(req.params.id, {
        favourite, category, type, songName, artist, song: songFilePath, imgSrc: imgFilePath, color
      }, { new: true }); // { new: true } returns the updated document

      res.status(200).json({ updatedSong });
    });
  } catch (error) {
    // Handle other errors
    res.status(500).json({ error: error.message });
  }
};