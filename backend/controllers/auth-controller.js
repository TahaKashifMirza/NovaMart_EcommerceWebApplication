const jwt = require('jsonwebtoken');
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const home = async (req, res) => {
    try {
        res
        .status(200)
        .json( { message:
            "Welcome to the Home Page by using Auth Controller"
    });
    } catch (error) {
        console.log (error);
        res.status(500).json({ message: "Internal Server Error !!"});
    }
}


const register = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const { username, email, phone, password } = req.body;

        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User Already Exists!" });
        }

        // Create a new user
        const userCreated = await User.create({ username, email, phone, password });

        // Generate a token
        const token = await userCreated.generateToken();

        res.status(201).json({
            message: "Registration Successful",
            token: token,
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

const login = async (req, res) => {
    try {
        console.log("Login Request Body:", req.body);
        const { email, password } = req.body;

        // Find user by email
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "User Not Found!" });
        }

        // Log the stored password for debugging
        console.log("Stored Password:", userExist.password);

        // Compare password
        const isMatch = await userExist.comparePassword(password);
        if (!isMatch) {
            console.log("Password does not match");
            return res.status(400).json({ message: "Invalid Password!" });
        }

        // Generate a token
        const token = await userExist.generateToken();

        res.status(200).json({
            message: "Login Successful",
            token: token,
            userId: userExist._id.toString(),
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};


// To Send User Data - User Logic

const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(user);
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(`error from the user route ${error}`);
    }
};

module.exports = { home, register, login, user };