const express = require('express');
const router = express.Router();

// load handler
const webhookHandler = require('./handler/webhook')

// POST WebHook
router.post('/', webhookHandler.webhook)

module.exports = router;
