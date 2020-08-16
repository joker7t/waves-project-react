const express = require('express');
const router = express.Router();
require('dotenv').config();

const { sendMailForPorfolio } = require('../utils/mail/');

// @route   POST api/porfolio/send-message
// @desc    send mail for porfolio, not related to this project
// @access  PUBLIC
router.post('/send-message', (req, res) => {
    try {
        const { email, name, message } = req.body;
        sendMailForPorfolio(name, email, message);
        res.json({ sucess: true });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;