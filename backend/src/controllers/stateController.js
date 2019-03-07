const express = require('express');

const authMiddleware = require('../middlewares/auth');

const State = require('../models/state');

const router=express.Router();
//router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const states = await State.find();

        return res.send({ states });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading states' });
    }
})

module.exports=(app)=>{
    app.use('/state',router)
}