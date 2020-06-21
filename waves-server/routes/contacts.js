const express = require('express');
const router = express.Router();

// @route   POST api/contacts
// @desc    get all user contacts
// @access  PRIVATE
router.get('/', (req, res) => {
    res.send('get all user contacts');
});

// @route   POST api/contacts
// @desc    add contact
// @access  PRIVATE
router.post('/', (req, res) => {
    res.send('add contact');
});

// @route   PUT api/contacts/:id
// @desc    update a contact
// @access  PRIVATE
router.put('/:id', (req, res) => {
    res.send('update a contact');
});

// @route   DELETE api/contacts
// @desc    delete a contact
// @access  PRIVATE
router.delete('/:id', (req, res) => {
    res.send('delete a contact');
});

module.exports = router;