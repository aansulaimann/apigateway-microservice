const express = require('express');
const router = express.Router();

// load handler
const lessonsHandler = require('./handler/lessons')

// POST Lessons
router.post('/', lessonsHandler.create);

// Update Lessons
router.put('/:id', lessonsHandler.update);

// DELETE Lessons
router.delete('/:id', lessonsHandler.destroy);

// GET Lessons
router.get('/:id', lessonsHandler.get);
router.get('/', lessonsHandler.getAll);


module.exports = router;
