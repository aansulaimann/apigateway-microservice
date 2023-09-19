const express = require('express');
const router = express.Router();

// load handler
const coursesHandler = require('./handler/courses')

// load JWT middleware
const verifyToken = require('../middlewares/verifyToken')

// load permission middleware
const can = require('../middlewares/permission')

// only admin can access
// POST Courses
router.post('/', verifyToken, can('admin'), coursesHandler.create);

// Update Courses
router.put('/:id', verifyToken, can('admin'), coursesHandler.update);

// DELETE Courses
router.delete('/:id', verifyToken, can('admin'), coursesHandler.destroy);

// public end points
// GET Courses
router.get('/', coursesHandler.getAll);
router.get('/:id', coursesHandler.get);


module.exports = router;
