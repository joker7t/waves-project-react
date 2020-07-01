const mongoose = require('mongoose');

const BrandSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
});

module.exports = mongoose.model('brand', BrandSchema);