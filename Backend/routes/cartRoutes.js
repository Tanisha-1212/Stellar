const express = require("express");
const router = express.Router();

const{addToCart, removeFromCart, getCart, checkout} = require("../controller/cartcontroller");

const {isLoggedIn} = require("../middleware/authMiddleware");


// fetch cart
router.get("/", isLoggedIn, getCart);

//add abg to cart
router.post("/", isLoggedIn, addToCart);

//remove bag from cart
router.delete("/:bagId", isLoggedIn, removeFromCart);

//checkout
router.post("/checkout", isLoggedIn, checkout);

module.exports = router;