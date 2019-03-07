const mongoose = require('../database/index')

const HistoricPriceSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true,
    },
    price: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const HistoricPrice = mongoose.model('HistoricPrice', HistoricPriceSchema)
module.exports = HistoricPrice