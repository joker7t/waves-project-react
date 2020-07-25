const mongoose = require('mongoose');

const SiteSchema = mongoose.Schema({
    address: {
        type: String,
        required: true,
        maxlength: 100
    },
    phone: {
        type: String,
        required: true,
        maxlength: 100
    },
    workingHour: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        maxlength: 100
    }
});

module.exports = mongoose.model('site', SiteSchema);