const express = require('express');
const router = express.Router();
const FavoritesController = require('../controllers/FavoriteController');

// Route to fetch all categories
router.get('/favorites', FavoritesController.getfavourites);

// Route to create a new favourite
router.post('/create-favorites', FavoritesController.createfavourites);
router.delete('/deletefavourites/:id', FavoritesController.deleteFavorites);
module.exports = router;
