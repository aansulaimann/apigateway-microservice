const express = require('express');
const router = express.Router();

// load handler
const imageCoursesHandler = require('./handler/ImageCourses')

// POST Image Courses
router.post('/', imageCoursesHandler.create)

// DELETE Image Courses
router.delete('/:id', imageCoursesHandler.destroy)

module.exports = router;