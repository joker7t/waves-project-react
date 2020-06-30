const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST api/users
// @desc    register user
// @access  PUBLIC
router.post('/register', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('name', "Please add name").not().isEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    } else {
        res.send('User created');
    }
});

// @route   POST api/auth
// @desc    auth user and get token
// @access  PRIVATE
router.post('/login', (req, res) => {
    res.send('logged in user');
});

module.exports = router;