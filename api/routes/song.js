const express = require('express');
const router = express.Router();
const songController = require('../controllers/SongController');

// Route to fetch all categories
router.get('/songs', songController.getSongs);
router.get('/getsongs/:id', songController.getSongDetails);
// Route to create a new category
router.post('/song', songController.createSongs);

router.put('/updatesong/:id', songController.updateSongDetails);
module.exports = router;
