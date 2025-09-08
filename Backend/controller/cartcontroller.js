const cart = require("../models/cart");
const bag = require("../models/bag");
const mongoose = require("mongoose");

exports.addToCart = async(req, res) => {
    try{
        const userId = req.user._id;
        const {bagId, quatity} = req.body;

        const bag = await bag.findById(bagId);
        if(!bagId) return res.status(404).json({message: "Bag not found"});
        if(bag.stock < quantity){
            return res.status(400).json({message: "Not enough stock"});
        }

        let cart = await cart.findOne({user: userId});
        if(!cart){
            cart = new cart({user: userId, items: [], totalPrice: 0});
        }

        const existingItemIndex = cart.items.findIndex(
            (item) => item.bag.toString() === bagId
        );

        if(existingItemIndex > -1){
            const newQuantity = cart.items[existingItemIndex].quantity + quatity;
            if(newQuantity > bag.stock){
                return res
                    .status(400)
                    .json({message: "Not available"});
                cart.items[existingItemIndex].quantity = newQuantity;
            } else{
                cart.items.push({bag: bagId, quantity, price: bag.price});
            }

            cart.totalPrice = cart.item.reduce(
                (total, item) => total + item.price* item.quantity, 0
            )
        }

        await cart.save();
        res.status(200).json(cart);

    }catch(err){
        return res.status(500).json({message: "Server error", error:err.message});
    }
};


exports.removeFromCart = async(req, res) => {
    try{
        const userId = req.user._id;
        const bagId = req.params.bagId;

        const cart = await cart.findOne({user: userId});
        if(!cart) return res.status(404).json({message: "Cart not found"});

        cart.items = cart.items.filter((item) => item.bag.toString() !== bagId);

        cart.totalPrice = cart.items.reduce(
            (total, item) => total + item.price* item.quantity, 0
        )

        await cart.save();
        res.status(200).json(cart);
    } catch(err){
        res.status(500).json({message: "Server error", error: err.message})
    }
};


exports.getCart = async(req, res) => {
    try{
        const userId = req.user._id;

        const cart = await cart.findOne({user: userId}).populate(
            "items.bag",
            "name price brand category imageUrl stock"
        );

        if(!cart) return res.status(404).json({message: "Cart not found"});

        const totalBags = cart.items.reduce((sum, item) => sum + item.quantity, 0);

        res.status(200).json({
            cart,
            totalBags,
            totalPrice: cart.totalPrice,
        });

    } catch(err){
        res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.checkout = async(req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const userId = req.user._id;
        const cart = await cart.findOne({user: userId}).populate("items.bag");

        if(!cart || cart.items.length === 0){
            return res.status(400).json({message : "Cart is empty"});
        }

        for(const item of cart.items){
            if(item.quantity > item.bag.stock){
                throw new Error(
                    `Not enough stock for ${item.bag.name}`
                )
            }
        }

        //Reduce stock
        for(const item of cart.items){
            await Bag.findByIdAndUpadte(
                item.bag._id,
                {$inc: {stock : -item.quantity}},
                {session}
            )
        }

        //clear cart
        cart.items = [],
        cart.totalPrice = 0;
        await cart.save({session});

        await session.commitTransaction();
        session.endSession();

    } catch(err){
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({message: "Checkout failed", error: err.message});
    }
};