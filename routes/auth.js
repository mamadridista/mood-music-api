const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'user with this email already exists' });
        }

        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Username is already taken '});
        }

        // create new user
        user = new User({ username, email, password });
        await user.save();

        // generate jwt
        const payload = { userId: user._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h' });

        res.status(201).json({token, message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error : ' + err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // generate jwt
        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, message: 'Login seccessful' });
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message});
    }
});

module.exports = router;