const express = require("express");
const authMiddleware = require("../middlewares/auth");
const { regValidate, loginValidate } = require("../utils/user.validate");
const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/user.controller");

const router = express.Router();

// User Registration Route (Public)
router.post("/register", regValidate, registerUser);

// User Login Route (Public)
router.post("/login", loginValidate, loginUser);

// Get User Profile Route (Protected)
router.get("/profile", authMiddleware, getUsers);

module.exports = router;
