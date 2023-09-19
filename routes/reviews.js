const express = require('express');
const router = express.Router();

// load handler
const reviewsHandler = require('./handler/reviews')

// POST Reviews
router.post('/', reviewsHandler.create);

// Update Reviews
router.put('/:id', reviewsHandler.update);

// DELETE Reviews
router.delete('/:id', reviewsHandler.destroy);


module.exports = router;
