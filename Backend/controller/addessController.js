const Address = require("../models/addressModel");

exports.addAddress = async (req, res) => {
  try {
    const address = await Address.create({ ...req.body, user: req.user._id });
    res.status(201).json({ address });
  } catch (err) {
    res.status(400).json({ message: "Failed to add address", error: err.message });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.status(200).json({ addresses });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch addresses", error: err.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const updated = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    res.status(200).json({ address: updated });
  } catch (err) {
    res.status(400).json({ message: "Failed to update address", error: err.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    await Address.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.status(200).json({ message: "Address deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete address", error: err.message });
  }
};
