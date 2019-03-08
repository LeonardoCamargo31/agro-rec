const express = require('express');

//precisamos de um middleware para interceptar, antes de chegar em /reseller passa pelo middleware
//e vamos pegar o req e verificar se o token é valido
const authMiddleware = require('../middlewares/auth');

const Reseller = require('../models/reseller');
const Product = require('../models/product');
const HistoricPrice = require('../models/historicPrice');

const router = express.Router();

//router.use(authMiddleware);

//carregar produtos de uma revendedora em especifico
router.get('/reseller/:resellerId', async (req, res) => {
    try {
        const products = await Product.find({ reseller: req.params.resellerId });
        return res.send({ products });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading products' });
    }
})

//carregar todos os produtos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();

        return res.send({ products });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading products' });
    }
})

//carregar um produto em especifico
router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        return res.send({ product });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading product' });
    }
})

//inserir um novo produto
router.post('/', async (req, res) => {
    try {
        const { title, price, reseller } = req.body;

        const product = new Product({ title, price, reseller });
        await product.save()

        const historicPrice = new HistoricPrice({ price: price, product: product._id })
        await historicPrice.save()

        return res.send({ product });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new product' });
    }
})

//alterar um produto
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
        return res.status(400).send({ error: 'Error updating product' });
    }
})

//deletar um produto
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