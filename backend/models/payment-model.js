const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  bankDetails: {
    bank: { type: String },
    accountNumber: { type: String },
    amount: { type: String },
  },
  products: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('Payment', paymentSchema);
