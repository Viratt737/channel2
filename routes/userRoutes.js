const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Signup route
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    try {
        // Check for duplicate username
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).send('Username is already taken.');
        }

        // Save new user
        const newUser = new User({ username, password });
        await newUser.save();

        // Set session and redirect
        req.session.user = newUser;
        res.redirect('/api');
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send('An error occurred during signup.');
    }
});

// Login route
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        req.session.user = user;
        res.redirect('/api');
    } else {
        res.send('Invalid credentials');
    }
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;