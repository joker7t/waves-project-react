const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Brand = require('../models/Brand');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   POST api/products/brands
// @desc    get all brands of products
// @access  PRIVATE
router.get('/brands', [auth, admin], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    try {
        const brands = await Brand.find({});
        res.json({
            success: true,
            branddata: brands
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/products/brand
// @desc    add a product's brand
// @access  PRIVATE
router.post('/brand', [auth, admin], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    try {
        const brand = new Brand(req.body);
        await brand.save();

        res.json({
            sucess: true,
            userdata: brand
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;