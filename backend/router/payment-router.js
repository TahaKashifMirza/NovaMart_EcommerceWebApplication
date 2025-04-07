const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment-controller');

// Route to handle payment data
router.post('/process-payment', paymentController.processPayment);

module.exports = router;
