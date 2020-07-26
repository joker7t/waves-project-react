const express = require('express');
const router = express.Router();

// @route   GET api/auth
// @desc    get logged in user
// @access  PRIVATE
router.get('/', (req, res) => {
    res.send('get logged in user');
});

// @route   POST api/auth
// @desc    auth user and get token
// @access  PRIVATE
router.post('/', (req, res) => {
    res.send('logged in user');
});

module.exports = router;