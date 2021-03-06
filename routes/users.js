const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const formidable = require('express-formidable');
const mongoose = require('mongoose');
const async = require('async');
require('dotenv').config();

const User = require('../models/User');
const Product = require('../models/Product');
const Payment = require('../models/Payment');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { sendMail } = require('../utils/mail/');

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
                sendMail(email);
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
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        });
    }, {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    });
});

// @route   DELETE api/users/uploadimage
// @desc    remove image
// @access  PRIVATE
router.delete('/removeimage', [auth, admin], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const imageId = req.query.public_id;
    cloudinary.uploader.destroy(imageId, (error, result) => {
        if (error) return res.json(error);
        res.status(200).send('ok');
    });
});

// @route   POST api/users/add-to-cart
// @desc    add cart to user
// @access  PRIVATE
router.post('/add-to-cart', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        let duplicated = false;

        user.carts.forEach(cart => {
            if (cart.id.toString() === req.query.productId) {
                duplicated = true;
            }
        });
        if (duplicated) {
            User.findOneAndUpdate(
                { _id: req.user.id, 'carts.id': mongoose.Types.ObjectId(req.query.productId) },
                { $inc: { 'carts.$.quantity': 1 } },
                { new: true },
                (err, doc) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(doc.carts);
                }
            );
        } else {
            User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $push: {
                        carts: {
                            id: mongoose.Types.ObjectId(req.query.productId),
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                //this code to return back object
                { new: true },
                (err, doc) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(doc.carts);
                }
            );
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/users/remove-from-cart
// @desc    remove cart in user
// @access  PRIVATE
router.delete('/remove-from-cart', auth, async (req, res) => {
    try {
        User.findOneAndUpdate(
            { _id: req.user.id },
            {
                $pull: {
                    carts: { id: mongoose.Types.ObjectId(req.query._id) }
                }
            },
            //this code to return back object
            { new: true },
            (err, doc) => {
                let carts = doc.carts;
                let array = carts.map(item => {
                    return mongoose.Types.ObjectId(item.id);
                })
                Product.find({ _id: { $in: array } })
                    .populate('brand').populate('wood')
                    .exec((err, cartDetails) => {
                        return res.status(200).json({ carts, cartDetails });
                    });
            }
        );

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/users/success-buy
// @desc    add buy items to history
// @params  cartDetails, paymentData
// @access  PRIVATE
router.post('/success-buy', auth, async (req, res) => {
    let histories = [];
    let transactionData = {};

    //user history
    req.body.cartDetails.forEach(cartDetail => {
        histories.push({
            dateOfPurchase: Date.now(),
            name: cartDetail.name,
            brand: cartDetail.brand.name,
            id: cartDetail._id,
            price: cartDetail.price,
            quantity: cartDetail.quantity,
            paymentId: req.body.paymentData.paymentID
        });
    });

    //set data for Payment object
    transactionData.user = req.user;
    transactionData.data = req.body.cartDetails;
    transactionData.products = histories;

    //update histories and carts in related user
    User.findOneAndUpdate(
        { _id: req.user.id },
        { $push: { histories: histories }, $set: { carts: [] } },
        { new: true },
        (err, doc) => {
            if (err) return res.json({ success: false, err });

            //Add payment
            const payment = new Payment(transactionData);
            payment.save((err, doc) => {
                if (err) return res.json({ success: false, err });

                //Update sold in products
                let products = [];
                doc.products.forEach(product => {
                    products.push({
                        id: product.id,
                        quantity: product.quantity
                    });
                });
                async.eachSeries(
                    products,
                    (item, callback) => {
                        Product.update(
                            { _id: item.id },
                            {
                                $inc:
                                {
                                    'sold': parseInt(item.quantity)
                                }
                            },
                            { new: false },
                            //pass all callbacks from Product, go to async callback
                            callback
                        );
                    },
                    //async callback
                    (err) => {
                        if (err) return res.json({ success: false, err });
                        res.status(200).send();
                    }
                );
            });
        }
    )
});

// @route   POST api/users/update-profile
// @desc    remove image
// @params  name, lastname, email
// @access  PRIVATE
router.post('/update-profile', auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    User.findOneAndUpdate(
        { _id: req.user.id },
        {
            $set: req.body
        },
        { new: true },
        (err, doc) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json(doc);
        }
    );
});

module.exports = router;