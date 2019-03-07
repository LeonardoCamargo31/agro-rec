const express = require('express');

//precisamos de um middleware para interceptar, antes de chegar em /reseller passa pelo middleware
//e vamos pegar o req e verificar se o token é valido

const authMiddleware = require('../middlewares/auth');

const Reseller = require('../models/reseller');
const Product = require('../models/product');
const HistoricPrice = require('../models/historicPrice');
const router = express.Router();

//router.use(authMiddleware);

router.get('/:productId', async (req, res) => {
    try {
        console.log(req.params.productId)
        const historicPrice = await HistoricPrice.find({ product: req.params.productId });

        return res.send({ historicPrice });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading products' });
    }
})


module.exports = (app) => {
    //vamos retornar 
    app.use('/historicPrice', router)//ou seja quando acessar o /reseller, chama a nossa router
}