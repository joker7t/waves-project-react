const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
    users: {
        type: Array,
        default: []
    },
    data: {
        type: Array,
        default: []
    },
    products: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('payment', PaymentSchema);