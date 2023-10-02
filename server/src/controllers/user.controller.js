const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user.model"); // Import your User model
dotenv.config();

// Handle user registration
exports.registerUser = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { uName, uEmail, uPassword, uType } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { userEmail: uEmail } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(uPassword, salt);

    const newUser = await User.create({
      userName: uName,
      userEmail: uEmail,
      userPassword: hashedPassword,
      userType: uType,
    });

    const token = jwt.sign(
      { userId: newUser.userId, userType: newUser.userType },
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      }
    );

    return res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Handle user login
exports.loginUser = async (req, res) => {
  try {
    // Validate user input using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract user login data from the request body
    const { uEmail, uPassword } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findOne({ where: { userEmail: uEmail } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(
      uPassword,
      user.userPassword
      );
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      
      // console.log(user.userId, user.userType);
    // Generate a JSON Web Token (JWT) for the user
    const token = jwt.sign(
      { userId: user.userId, userType: user.userType },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h", // Token expiration time (you can change it)
      }
    );

    return res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    // Access the authenticated user's data through req.user
    const user = await User.findByPk(req.user.userId, {
      attributes: ['userId', 'userName', 'userEmail', 'userType'],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}