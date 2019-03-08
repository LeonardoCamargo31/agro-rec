const mongoose = require('../database/index')

const ResellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Reseller = mongoose.model('Reseller', ResellerSchema)
module.exports = Reseller