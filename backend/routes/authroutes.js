const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authmiddleware=require("../middleware/authmiddleware")
const axios = require("axios");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password, interests } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, interests });
        await user.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
router.get("/profile", authmiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password from response
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

const NEWS_API_KEY = "489493014c401711a802cef4d2468ee7";
const NEWS_API_URL = "https://gnews.io/api/v4/search";


// Fetch news based on user interests
router.get("/", authmiddleware, async (req, res) => {
    try {
        // Get user interests from the database
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const userInterest = user.interests.length > 0 ? user.interests[0] : "general"; // Default to "general"
        console.log(`Fetching news for interest: ${userInterest}`); // ✅ Log interest

        // Call GNews API
        const response = await axios.get(NEWS_API_URL, {
            params: {
                q: userInterest,
                apikey: NEWS_API_KEY, // ✅ Correct parameter name
                lang: "en", // Get English news
                country: "us", // Get US-based news
            },
        });

        console.log(`Fetched ${response.data.articles.length} articles`); // ✅ Log number of articles
        res.json(response.data.articles);
    } catch (error) {
        console.error("Error fetching news:", error.response?.data || error.message);
        res.status(500).json({ message: "Error fetching news", error: error.message });
    }
});



module.exports = router;
