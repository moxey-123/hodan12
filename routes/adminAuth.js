const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router(); // ⚡ Must define router first

// Admin login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(400).json({ message: "Invalid username" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// TEMP: Create admin account (use once)
router.post("/create-admin", async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        await Admin.create({ username, password: hashed });
        res.send("Admin created");
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
