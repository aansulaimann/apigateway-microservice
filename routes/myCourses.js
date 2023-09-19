const express = require('express');
const router = express.Router();

// load handler
const myCoursesHandler = require('./handler/myCourses')

// POST Mentors
router.post('/', myCoursesHandler.create);

// GET Mentors
router.get('/', myCoursesHandler.get);


module.exports = router;
