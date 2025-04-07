// controllers/contact-controller.js

const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contact = new Contact({
      name,
      email,
      message,
    });

    await contact.save();
    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Error saving contact form data:", error);
    res.status(500).json({ message: "Error submitting contact form" });
  }
};

module.exports = contactForm;
