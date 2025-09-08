const Order = require("../models/order");
const Cart = require("../models/cart");
const Bag = require("../models/bag");

exports.checkout = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.bag");

    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    // Check stock and reduce
    for (let item of cart.items) {
      if (item.quantity > item.bag.stock) {
        return res.status(400).json({ 
          message: `Not enough stock for ${item.bag.name}` 
        });
      }
    }

    // Deduct stock
    for (let item of cart.items) {
      item.bag.stock -= item.quantity;
      await item.bag.save();
    }

    // Create order without totalPrice
    const order = new Order({
      user: userId,
      items: cart.items.map(i => ({
        bag: i.bag._id,
        quantity: i.quantity,
        price: i.price
      })),
      status: "completed"
    });

    await order.save();

    // Clear cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.bag")
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json(orders);

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

