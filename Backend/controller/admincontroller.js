const Bag = require("../models/bag");
const User = require("../models/user");
const Order = require("../models/order");

// 📦 BAG CONTROLLERS
exports.getAllBags = async (req, res) => {
  try {
    const bags = await Bag.find();
    res.json(bags);
  } catch (err) {
    console.error("Error fetching bags:", err);
    res.status(500).json({ message: "Failed to fetch bags" });
  }
};

exports.addBag = async (req, res) => {
  try {
    const newBag = await Bag.create(req.body);
    res.status(201).json(newBag);
  } catch (err) {
    console.error("Error adding bag:", err);
    res.status(400).json({ message: "Failed to add bag" });
  }
};

exports.updateBag = async (req, res) => {
  try {
    const updatedBag = await Bag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBag)
      return res.status(404).json({ message: "Bag not found" });
    res.json(updatedBag);
  } catch (err) {
    console.error("Error updating bag:", err);
    res.status(400).json({ message: "Failed to update bag" });
  }
};

exports.deleteBag = async (req, res) => {
  try {
    const deletedBag = await Bag.findByIdAndDelete(req.params.id);
    if (!deletedBag)
      return res.status(404).json({ message: "Bag not found" });
    res.json({ message: "Bag deleted successfully" });
  } catch (err) {
    console.error("Error deleting bag:", err);
    res.status(500).json({ message: "Failed to delete bag" });
  }
};

// 👥 USER CONTROLLERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// 🛒 ORDER CONTROLLERS
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "fullName email")
      .populate("items.bag", "name price imageUrl");
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("user", "fullName email")
      .populate("items.bag", "name price imageUrl");

    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });

    res.json(updatedOrder);
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(400).json({ message: "Failed to update order status" });
  }
};
