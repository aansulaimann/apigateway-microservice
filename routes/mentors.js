const express = require('express');
const router = express.Router();

// load handler
const mentorsHandler = require('./handler/mentors')

// POST Mentors
router.post('/', mentorsHandler.create);

// GET Mentors
router.get('/', mentorsHandler.getAll);
router.get('/:id', mentorsHandler.get);

// Update Mentors
router.put('/:id', mentorsHandler.update);

// DELETE Mentors
router.delete('/:id', mentorsHandler.destroy);


module.exports = router;
