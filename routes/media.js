const express = require('express');
const router = express.Router();

// load handler
const mediaHandler = require('./handler/media')

// POST media
router.post('/', mediaHandler.create);

// GET Media
router.get('/', mediaHandler.getAll);

// DELETE Media
router.delete('/:id', mediaHandler.destroy);


module.exports = router;
