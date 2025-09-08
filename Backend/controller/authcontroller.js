const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_KEY = process.env.JWT_KEY;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

exports.signup = async(req, res)=>{
    try{
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({
            message: "email already exist"
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: 'user'
        });

        res.status(201).json({
        message: "User created successfully",
        user: {
            username,
            email,
            role: user.role
            }
        })
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

        const token = jwt.sign({
            id: user._id,
            role: user.role        
            },
            JWT_KEY,
            {expiresIn: JWT_EXPIRES_IN}
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch(err){
        res.status(500).json({message: err.message});
    };
}