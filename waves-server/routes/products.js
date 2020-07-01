const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Brand = require('../models/Brand');
const auth = require('../middleware/auth');

// @route   POST api/products/brands
// @desc    get all brands of products
// @access  PRIVATE
router.get('/brands', auth, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    res.send('get all brands');
});

module.exports = router;