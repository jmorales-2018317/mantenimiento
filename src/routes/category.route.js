'use strict'

const categoryController = require('../controllers/category.controller');
const express = require('express');
const api = express.Router();

api.get('/test', categoryController.test);

api.post('/save', categoryController.saveCategory);
api.get('/', categoryController.getCategories);
api.get('/:id', categoryController.getCategory);
api.put('/:id', categoryController.updateCategory);
api.delete('/:id', categoryController.deleteCategory);

module.exports = api;