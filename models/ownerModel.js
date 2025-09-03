const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/stellar");

const ownerSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    products: {
        type: Array,
        default: [],
    },
    picture: String,
    gstin: String
});

module.exports = mongoose.model("user", userSchema);

