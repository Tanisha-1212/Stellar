const jwt = require("jsonwebtoken");
const User = require("../models/user");


exports.isLoggedIn = async (req, res, next) => {
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) return res.status(401).json({message: "Unauthorized"});
        
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_KEY);
        } catch (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = user;
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