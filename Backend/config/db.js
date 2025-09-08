const mongoose = require("mongoose");

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to mongodb")
    }
    catch(error){
        console.log("Mongodb is not connected")
    }
};

module.exports = connectDB;