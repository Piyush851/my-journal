// controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

exports.signup = async (req, res) => {
    try {
        console.log("✅ SIGNUP ROUTE HIT:", req.body);

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const user = new User({ name, email, password });

        await user.save();
        console.log("✅ USER SAVED:", user);

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        return res.status(201).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });

    } catch (error) {
        console.log("❌ SIGNUP ERROR:", error);

        // If duplicate email error comes from DB layer
        if (error.code === 11000) {
            return res.status(400).json({ error: "Email already exists" });
        }

        return res.status(500).json({ error: error.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isValid = await user.comparePassword(password);

        if (!isValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        return res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token
        });

    } catch (error) {
        console.log("❌ LOGIN ERROR:", error);
        return res.status(500).json({ error: error.message });
    }
};


exports.getMe = async (req, res) => {
    try {
        return res.json({
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email
            }
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

