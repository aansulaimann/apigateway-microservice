const express = require('express');
const router = express.Router();

// panggil middleware | Aan
const verifyToken = require('../middlewares/verifyToken')

// load handler
const usersHandler = require('./handler/users')

// POST register
router.post('/register', usersHandler.register);

// POST login
router.post('/login', usersHandler.login);

// PUT users
router.put('/', verifyToken, usersHandler.update)

// GET users
router.get('/', verifyToken, usersHandler.getUser)

// POST Logout users
router.post('/logout', verifyToken, usersHandler.logout)

module.exports = router;
