const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_KEY, {
    expiresIn: "7d", // token valid for 7 days
  });
};


exports.signup = async(req, res)=>{
    try{
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({
            message: "Email already exist"
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: 'user'
        });

        const token = createToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1000*60*60*24*7,
        })
        .status(201)
        .json({user});

    } catch(err){
        res.status(500).json({message: err.message});
    }
};

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({
            message: "Invalid credentials"
        });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        });

        const token = createToken(user._id);
        res
        .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        })
        .status(200)
        .json({ user: user });
    } catch(err){
        res.status(500).json({message: err.message});
    };
};

exports.logout = async (req, res) => {
  try {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Logout failed" });
  }
};

// controllers/authController.js
// controller/authController.js
exports.getCurrentUser = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });

    // Send user info (omit password)
    const user = {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    };

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

