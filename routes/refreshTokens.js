const express = require('express');
const router = express.Router();

// load handler
const refreshTokensHandler = require('./handler/refresh-tokens')

// POST register
router.post('/', refreshTokensHandler.refreshToken);


module.exports = router;
