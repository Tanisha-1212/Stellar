const express = require("express");
const { isLoggedIn } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/authMiddleware");
const {
  getAllBags, addBag, updateBag, deleteBag,
  getAllUsers, getAllOrders, updateOrderStatus
} = require("../controller/admincontroller");

const router = express.Router();

router.get("/bags", isLoggedIn, isAdmin, getAllBags);
router.post("/bags", isLoggedIn, isAdmin, addBag);
router.put("/bags/:id", isLoggedIn, isAdmin, updateBag);
router.delete("/bags/:id", isLoggedIn, isAdmin, deleteBag);

router.get("/users", isLoggedIn, isAdmin, getAllUsers);
router.get("/orders", isLoggedIn, isAdmin, getAllOrders);
router.put("/orders/:id", isLoggedIn, isAdmin, updateOrderStatus);

module.exports = router;
