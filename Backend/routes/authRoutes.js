const express = require("express");
const router = express.Router();
const {signup, login, getCurrentUser, logout}  = require("../controller/authcontroller");
const { isLoggedIn } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", isLoggedIn,  getCurrentUser);
router.post("/logout", isLoggedIn, logout)

module.exports = router;