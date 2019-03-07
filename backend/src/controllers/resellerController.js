const express = require('express');

//precisamos de um middleware para interceptar, antes de chegar em /reseller passa pelo middleware
//e vamos pegar o req e verificar se o token é valido

const authMiddleware = require('../middlewares/auth');

const Reseller = require('../models/reseller');
const Product = require('../models/product');

const router = express.Router();

//router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const resellers = await Reseller.find();

        return res.send({ resellers });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading resellers' });
    }
})

router.get('/:resellerId', async (req, res) => {
    try {
        const reseller = await Reseller.findById(req.params.resellerId);

        return res.send({ reseller });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading reseller' });
    }
})

router.post('/', async (req, res) => {
    try {
        console.log( req.body)
        const { name, address, photo } = req.body;

        const reseller = await Reseller.create({ name, address, photo });

        return res.send({ reseller });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new reseller' });
    }
})

router.put('/:resellerId', async (req, res) => {
    try {
        const { name, address, photo } = req.body;

        const reseller = await Reseller.findByIdAndUpdate(req.params.resellerId, {
            name,
            address,
            photo
        }, { new: true });//quando atualizando ele por padrão não retorna o valor atualizado, retorna o valor antigo
        //e usando o {new:true}, ele retorna o documento atualizado

        return res.send({ reseller });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating reseller' });
    }
})

router.delete('/:resellerId', async (req, res) => {
    try {

        const products=await Product.find({ reseller: req.params.resellerId });
        
        if(products.length>0){
            console.log('Possui produtos')
            return res.send({ code: 2 });
        }else{
            console.log('pode deletar')
            await Reseller.findByIdAndRemove(req.params.resellerId);
            return res.send({ code: 1 });
        }
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting reseller' });
    }
})


module.exports = (app) => {
    //vamos retornar 
    app.use('/reseller', router)//ou seja quando acessar o /reseller, chama a nossa router
}