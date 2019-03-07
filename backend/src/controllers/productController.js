const express = require('express');

var fs = require('fs');
var multer = require('multer');
var multerConfig = require('../config/multer');//arquivo com a configuração do meu multer

//precisamos de um middleware para interceptar, antes de chegar em /reseller passa pelo middleware
//e vamos pegar o req e verificar se o token é valido
const authMiddleware = require('../middlewares/auth');

const Reseller = require('../models/reseller');
const Product = require('../models/product');
const HistoricPrice = require('../models/historicPrice');

const router = express.Router();

//router.use(authMiddleware);

router.get('/:resellerId', async (req, res) => {
    try {
        console.log(req.params.resellerId)
        const products = await Product.find({ reseller: req.params.resellerId });

        return res.send({ products });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading products' });
    }
})

/*/reports?client={client_id}
router.get('/:resellserId?client={client_id}', async (req, res) => {
    try {
        //req.query.tagId
        const product = await Product.findById(req.params.productId);

        return res.send({ product });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading product' });
    }
})*/

router.post('/', multer(multerConfig).single('photo'), async (req, res) => {
    try {
        console.log(req.body)
        const { title, price, reseller } = req.body;

        const product = new Product({ title, price, reseller });
        await product.save()

        const historicPrice = new HistoricPrice({ price: price, product: product._id })
        await historicPrice.save()

        return res.send({ product });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error creating new product' });
    }
})

router.put('/:productId', async (req, res) => {
    try {
        const { title, price, reseller } = req.body;

        const product = await Product.findByIdAndUpdate(req.params.productId, {
            title,
            price,
            reseller
        }, { new: true });

        const historicPrice = new HistoricPrice({ price: price, product: product._id })
        await historicPrice.save()

        return res.send({ product });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error updating product' });
    }
})

router.delete('/:productId', async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.productId);

        await HistoricPrice.remove({ product: req.params.productId });

        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting product' });
    }
})


module.exports = (app) => {
    //vamos retornar 
    app.use('/product', router)//ou seja quando acessar o /reseller, chama a nossa router
}