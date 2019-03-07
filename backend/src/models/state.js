const mongoose = require('../database/index')

const StateSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    stateName: {
        type: String,
        required: true
    },
    cities: [{
        type: String
    }]
},
{ collection : 'state' })//especificar o nome da coleção sob o esquema 

const State = mongoose.model('state', StateSchema)
module.exports = State


