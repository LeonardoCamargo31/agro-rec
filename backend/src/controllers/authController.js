const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const User = require('../models/user')

const router = express.Router()


//agora vamos gerar nosso token
function generateToken(params = {}) {
    //passamos a informação que difere um usuario do outro, e o hash que precisa ser unico
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,//tempo de expiração, deixamos para um dia 86400 segundos
    });
}

router.post('/register', async (req, res) => {
    const { email } = req.body
    try {
        //buscar usuario pelo email, se já existir
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'Usuario já existe' })
        }

        const user = await User.create(req.body)//await espera finalizar isso para continuar o fluxo

        user.password = undefined//assim não exibe a senha
        return res.send({ user })
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' })
    }
})


router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body
    //buscar usuario pelo email, se já existir
    const user = await User.findOne({ email }).select('+password')//.select('+password') assim tb seleciono o meu passowrd que tinhamos definido de não vir
    if (!user) {
        return res.status(400).send({ error: 'User not found' })
    }

    //comparando as senhas, para isso uso o bcrypt, criptografando a senha informada
    //await pois é uma função assincrona
    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid password' })
    }

    user.password = undefined//assim não exibe a senha


    //cada vez gera um token diferente, pois se baseia no timestamp
    res.send({ user, token: generateToken({ id: user.id }) })
})



//aqui recuperamos o app que foi passado
//como é um só podemos deixar sem parenteses
module.exports = (app) => {
    //vamos retornar 
    app.use('/auth', router)//ou seja quando acessar o /auth, chama a nossa router
}