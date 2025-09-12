const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/authMiddleware");
const { checkout, getOrders,cancelOrder } = require("../controller/ordercontroller");

// POST /api/orders/checkout → Checkout cart and create order
router.post("/checkout", isLoggedIn, checkout);

// GET /api/orders/my-orders → Get logged-in user's order history
router.get("/my-orders", isLoggedIn, getOrders);

//cancel order
router.put("/:id/cancel", isLoggedIn, cancelOrder);


module.exports = router;
