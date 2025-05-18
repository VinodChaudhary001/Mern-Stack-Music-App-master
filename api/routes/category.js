const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');

// Route to fetch all categories
router.get('/categories', categoryController.getCategories);

// Route to create a new category
router.post('/category', categoryController.createCategory);

module.exports = router;
