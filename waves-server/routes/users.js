const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const formidable = require('express-formidable');
require('dotenv').config();

const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// @route   GET api/users/auth
// @desc    get logged in user
// @access  PRIVATE
router.get('/auth', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({
            ...user._doc,
            isAdmin: user.role === 0 ? false : true
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/users/register
// @desc    register user
// @access  PUBLIC
router.post('/register', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('name', "Please add name").not().isEmpty(),
    check('lastname', "Please add lastname").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    } else {
        try {
            const { email, password, name, lastname } = req.body;
            let user = await User.findOne({ email });
            if (user) {
                res.status(400).json({
                    sucess: false,
                    message: 'User already existed'
                });
            }
            user = new User({ email, password, name, lastname });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            const payload = {
                user: {
                    id: user.id,
                    role: user.role
                }
            };

            jwt.sign(payload, process.env.SECRET, {
                expiresIn: 360000
            }, (error, token) => {
                if (error) throw error;
                res.json({
                    sucess: true,
                    userdata: token
                });
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
});

// @route   POST api/users/login
// @desc    auth user and get token
// @access  PRIVATE
router.post('/login', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
], async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({
                success: false,
                message: 'Wrong credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 360000
        }, (error, token) => {
            if (error) throw error;
            res.json({
                success: true,
                userdata: token
            });
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/users/uploadimage
// @desc    upload images
// @access  PRIVATE
router.post('/uploadimage', [auth, admin, formidable()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    //client must send the same dir with this
    cloudinary.uploader.upload(req.files.file.path, (result) => {
        console.log(result);
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        });
    }, {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    });
});

module.exports = router;