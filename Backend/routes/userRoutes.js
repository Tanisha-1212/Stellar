// routes/userRoutes.js
const express = require("express");
const { getProfile, updateProfile, getOrders, changePassword } = require("../controller/userController");
const { isLoggedIn } = require("../middleware/authMiddleware");
const router = express.Router();

// Get user profile
router.get("/profile", isLoggedIn, getProfile);

// Update user profile
router.put("/profile", isLoggedIn, updateProfile);

// Get user's orders
router.get("/orders", isLoggedIn, getOrders);

//change password
router.get("/change-password", isLoggedIn, changePassword);

module.exports = router;

