const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isLoggedIn = async (req, res, next) => {
  try {
    // 1️⃣ Get token from cookie
    const token = req.cookies?.token; // optional chaining in case cookies undefined
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token found" });
    }

    // 2️⃣ Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }

    // 3️⃣ Fetch user from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 4️⃣ Attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
