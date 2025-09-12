const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/authMiddleware");
const { addAddress, getAddresses, updateAddress, deleteAddress } = require("../controller/addressController");

router.post("/", isLoggedIn, addAddress);
router.get("/", isLoggedIn, getAddresses);
router.put("/:id", isLoggedIn, updateAddress);
router.delete("/:id", isLoggedIn, deleteAddress);

module.exports = router;
