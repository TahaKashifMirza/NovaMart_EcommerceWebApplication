const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config(); // Ensure you have dotenv installed and configured

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email uniqueness
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
});

// Secure the password with bcrypt before saving
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

// Compare the password
userSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (error) {
        console.log("Error comparing password:", error);
        return false;
    }
};

// Generate JWT token
userSchema.methods.generateToken = function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin
            },
            process.env.JWT_SECRET_KEY, // Correct the typo
            {
                expiresIn: '1d' // Use a string for duration
            }
        );
    } catch (error) {
        console.log("Error generating token:", error);
    }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
