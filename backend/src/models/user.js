const mongoose = require('../database/index')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false//para quando buscar o usuario, essa informação não venha no array
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})
//ou seja pre('save') antes de salvar 
UserSchema.pre('save', async function (next) {
    //this é objeto que esta sendo salvo
    //quantas vezes quero que o hash seja gerado, chamamos de rounds aqui 10
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

const User = mongoose.model('User', UserSchema)
module.exports = User