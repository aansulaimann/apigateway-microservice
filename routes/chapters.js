const express = require('express');
const router = express.Router();

// load handler
const chaptersHandler = require('./handler/chapters')

// POST Chapters
router.post('/', chaptersHandler.create)

// Update Chapters
router.put('/:id', chaptersHandler.update)

// DELETE Chapters
router.delete('/:id', chaptersHandler.destroy)

// GET Chapters
router.get('/:id', chaptersHandler.get)
router.get('/', chaptersHandler.getAll)




module.exports = router;
