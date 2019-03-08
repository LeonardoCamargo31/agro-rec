const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

//next para chamar o proximo passo ou seja, esta tudo okay
module.exports = (req, res, next) => {
    //buscamos o header authorization
    const authHeader = req.headers.authorization
    console.log(req.headers)
    if (!authHeader){//se não tiver um authHeader
        console.log('No token provided')
        return res.status(401).send({ error: 'No token provided' })
    }

    //verificar se o token esta no formato certo
    //sempre é assim Bearer fre4f4rfe54rf5rfew4fre4f98f
    const parts = authHeader.split(' ')

    //verificamos se esse token tem duas partes
    if (!parts.length === 2){
        console.log('Token error')
        return res.status(401).send({ error: 'Token error' })
    }

    //então temos scheme=>Bearer e o token=> a hash
    const [scheme, token] = parts;

    //verificamos se scheme esta escrito Bearer
    //^ indica o inicio
    //$ indica o fim
    //i indica que é casesensitive
    if (!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ error: 'Token malformatted' })
    }


    //ai se estiver okay, enviamos para validar
    //validamo o possivel para não gastar processamento com nossa verificação
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Token invalid' })
        }

        //incluimos o user .id para as proximas requisição 
        //decoded que estamos recebendo.id
        //no nosso auth codificamos o id, então aqui temos ele
        req.userId = decoded.id;
        return next();
    });
};