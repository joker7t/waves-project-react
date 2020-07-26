const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductShema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    description: {
        required: true,
        type: String,
        maxlength: 100000
    },
    price: {
        required: true,
        type: Number,
        maxlength: 255
    },
    brand: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'brand'
    },
    shipping: {
        required: true,
        type: Boolean
    },
    available: {
        required: true,
        type: Boolean
    },
    wood: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'wood'
    },
    frets: {
        required: true,
        type: Number
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    publish: {
        required: true,
        type: Boolean
    },
    images: {
        type: Array,
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('product', ProductShema);