const express = require('express');
const router = express.Router();

// panggil middleware | Aan
// const verifyToken = require('../middlewares/verifyToken')

// load handler
const orderPaymentHandler = require('./handler/orderPayment')

// POST Order Payments
router.get('/', orderPaymentHandler.getOrders);

module.exports = router;
