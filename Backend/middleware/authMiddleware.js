const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_KEY = process.env.JWT_KEY;

exports.isLoggedIn = async (req, res, next) => {
    try{
        const token = req.header.authorization?.split(" ")[1];
        if(!token) return res.status(401).json({message: "Unauthorized"});
        
        const decoded = jwt.verify(token, JWT_KEY);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    }catch(err){
        res.status(401).json({message: "Invalid or expired token"});
    }
};

exports.isAdmin = (req, res, next) => {
    if(req.user.role !== "admin") return res.status(403).json({
        message: "Admin access only"
    });
    next();
}