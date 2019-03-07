const express = require('express')
const bodyParser = require('body-parser')
const allowCors = require('./config/cors')

const app=express()//inicializando nossa aplicação

app.use(allowCors)
app.use(bodyParser.json())//para ele entender quando enviar uma requisão com informações em json
app.use(bodyParser.urlencoded({extended:false}))//para ele entender quando passar parametros via url



require('./controllers/authController')(app)//e repassamos ao controller nossa instancia de app
require('./controllers/resellerController')(app)
require('./controllers/productController')(app)
require('./controllers/stateController')(app)
require('./controllers/historicPriceController')(app)

app.listen(5000)

