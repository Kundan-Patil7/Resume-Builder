const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authController");

const router = express.Router();

// Auth Routes
router.post("/register", registerUser); // For user registration
router.post("/login", loginUser); // For user login
router.get("/profile", getUserProfile); // For fetching user profile

module.exports = router;
