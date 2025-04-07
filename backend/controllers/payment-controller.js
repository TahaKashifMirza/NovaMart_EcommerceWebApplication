const Payment = require('../models/payment-model');

// Controller function to handle payment data
exports.processPayment = async (req, res) => {
  try {
    const { address, email, phone, paymentMethod, bankDetails, products } = req.body;

    // Create a new payment record
    const newPayment = new Payment({
      address,
      email,
      phone,
      paymentMethod,
      bankDetails,
      products,
    });

    await newPayment.save();

    res.status(201).json({ message: 'Payment data received successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
