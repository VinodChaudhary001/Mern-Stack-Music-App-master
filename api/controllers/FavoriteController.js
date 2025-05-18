const Favorites = require('../models/Favorites');

// Controller function to fetch all categories


exports.getfavourites = async (req, res) => {
  try {
    const favorites = await Favorites.find(); // Use a different variable name here
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to create a new Favourite
exports.createfavourites = async (req, res) => {
  try {
    const { song_id } = req.body;
    const favorite = new Favorites({ song_id });
    const savedFavorite = await favorite.save();
    res.status(201).json(savedFavorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteFavorites = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters
    // Use the ID to find and delete the favorite
    const deletedFavorite = await Favorites.findByIdAndDelete(id);
    if (!deletedFavorite) {
      // If the favorite with the provided ID is not found, return a 404 status
      return res.status(404).json({ error: "Favorite not found" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


