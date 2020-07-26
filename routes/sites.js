const express = require('express');
const router = express.Router();
const Site = require('../models/Site');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET api/sites/site-data
// @desc    get site data
// @access  PUBLIC
router.get('/site-data', async (req, res) => {
    Site.find(
        {},
        (err, site) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json(site[0]);
        }
    );
});

// @route   POST api/sites/update-site-data
// @desc    update site data
// @access  PRIVATE
router.post('/update-site-data', [auth, admin], async (req, res) => {
    Site.findOneAndUpdate(
        { _id: req.body._id },
        { $set: req.body },
        { new: true },
        (err, site) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json(site);
        }
    );
});

module.exports = router;