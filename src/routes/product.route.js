'use strict'

const express = require('express');
const api = express.Router();
const productController = require('../controllers/product.controller');

api.get('/testProduct', productController.testProduct);

api.post('/product', productController.saveProduct);
api.get('/products', productController.getProducts);
api.get('/product/:id', productController.getProduct);
api.put('/product/:id', productController.updateProduct);
api.delete('/product/:id', productController.deleteProduct);

module.exports = api;