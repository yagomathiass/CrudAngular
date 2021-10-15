const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const department_controller = require('./department_controler');
const product_controller = require('./product_controller')

const app = express();
    
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

mongoose.connect('mongodb+srv://yago_mathias:yago_mathias@cluster0.lmo8k.mongodb.net/aplicacao_http?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

app.use('/departments', department_controller)
app.use('/products', product_controller)

app.listen(3000);