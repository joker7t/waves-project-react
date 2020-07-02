const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Brand = require('../models/Brand');
const Wood = require('../models/Wood');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET api/products/brands
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
            branddata: brand
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/products/wood
// @desc    add a wood
// @access  PRIVATE
router.post('/wood', [auth, admin], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    try {
        const wood = new Wood(req.body);
        await wood.save();

        res.json({
            sucess: true,
            woodata: wood
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/products/woods
// @desc    get all brands of products
// @access  PRIVATE
router.get('/woods', [auth, admin], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    try {
        const woods = await Wood.find({});
        res.json({
            success: true,
            wooddata: woods
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/products/article
// @desc    add a product
// @access  PRIVATE
router.post('/article', [auth, admin], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    try {
        const product = new Product(req.body);
        await product.save();

        res.json({
            sucess: true,
            productdata: product
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/products/article
// @param   id=[4sdfsdfwer, 234gfgdfgdf, 34534543sdfds]
// @param   type={array or single}
// @desc    get product by ids
// @access  PRIVATE
router.get('/article/', [auth, admin], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    try {
        let type = req.query.type;

        if (type === 'array') {
            let ids = req.query.id.split(',');
            let products = [];
            for (let i = 0; i < ids.length; i++) {
                try {
                    let product = await Product.findById(ids[i]).populate('brand').populate('wood');
                    if (product) {
                        products.push(product);
                    }
                } catch (error) {
                    console.log('Id is not valid: ' + ids[i]);
                }
            }
            res.json({
                success: true,
                productdata: products
            });
        } else {
            let product = await Product.findById(req.query.id).populate('brand').populate('wood');
            if (!product) return res.status(404).json({ message: 'Contact not found' });

            res.json({
                sucess: true,
                productdata: product
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/products/article
// @param   sortBy
// @param   order
// @param   limit
// @param   skip
// @desc    get all products with limit and skip and sort by create time
// @access  PRIVATE
router.get('/articles/', [auth, admin], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    try {
        let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
        let order = req.query.order ? req.query.order : 'asc';
        let limit = req.query.limit ? req.query.limit : 100;
        let skip = req.query.skip ? req.query.skip : 0;

        let products = await Product.find({})
            .populate('brand').populate('wood')
            .sort([[sortBy, order]])
            .limit(limit)
            .skip(skip)
            ;

        res.json({
            success: true,
            productdata: products
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }

});

module.exports = router;