const Cart = require("../models/cart");
const Bag = require("../models/bag");
const mongoose = require("mongoose");

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { bagId, quantity } = req.body;

        // Check bag existence
        const bagDoc = await Bag.findById(bagId);
        if (!bagDoc) return res.status(404).json({ message: "Bag not found" });
        if (bagDoc.stock < quantity) return res.status(400).json({ message: "Not enough stock" });

        // Find or create cart
        let cart = await Cart.findOne({ user: userId });
        if (!cart) cart = new Cart({ user: userId, items: [], totalPrice: 0 });

        // Check if item already exists
        const existingItemIndex = cart.items.findIndex(item => item.bag.toString() === bagId);

        if (existingItemIndex > -1) {
            const newQuantity = cart.items[existingItemIndex].quantity + quantity;
            if (newQuantity > bagDoc.stock)
                return res.status(400).json({ message: "Not enough stock" });

            cart.items[existingItemIndex].quantity = newQuantity;
        } else {
            cart.items.push({ bag: bagId, quantity, price: bagDoc.price });
        }

        // Recalculate total price
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const bagId = req.params.bagId;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.bag.toString() !== bagId);

        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get cart details
exports.getCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId }).populate(
            "items.bag",
            "name price brand category imageUrl stock"
        );

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const totalBags = cart.items.reduce((sum, item) => sum + item.quantity, 0);

        res.status(200).json({
            cart,
            totalBags,
            totalPrice: cart.totalPrice,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Checkout
exports.checkout = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId }).populate("items.bag").session(session);

        if (!cart || cart.items.length === 0) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Check stock
        for (const item of cart.items) {
            if (item.quantity > item.bag.stock) {
                throw new Error(`Not enough stock for ${item.bag.name}`);
            }
        }

        // Reduce stock
        for (const item of cart.items) {
            await Bag.findByIdAndUpdate(
                item.bag._id,
                { $inc: { stock: -item.quantity } },
                { session }
            );
        }

        // Clear cart
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: "Checkout successful" });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Checkout failed", error: err.message });
    }
};

exports.removeQuantityFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { bagId, quantity } = req.body;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.bag.toString() === bagId);
        if (itemIndex === -1) return res.status(404).json({ message: "Item not found in cart" });

        // Reduce quantity or remove item
        if (cart.items[itemIndex].quantity > quantity) {
            cart.items[itemIndex].quantity -= quantity;
        } else {
            cart.items.splice(itemIndex, 1); // remove completely if quantity <= requested
        }

        // Update total price
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
