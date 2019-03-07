const mongoose = require('../database/index')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    reseller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reseller',
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product