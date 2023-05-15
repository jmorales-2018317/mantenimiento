'use strict'

const Category = require('../models/category.model');
const Product = require('../models/product.model');

exports.test = (req, res)=>{
    return res.send({message: 'test running'});
}

exports.saveCategory = async(req, res)=>{
    try{
        //validar que no se duplique una categoria
        let params = req.body;
        let categoryAlready = await Category.findOne({name: params.name});
        if(categoryAlready) return res.send({message: 'Category name already taken'})
        let category = new Category(params);
        await category.save();
        return res.send({message: 'Saved category'});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error saving category'});
    }
}

exports.getCategories = async(req, res)=>{
    try{
        let categories = await Category.find();
        return res.send({message: 'Categories found: ', categories});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error getting categories'});
    }
}

exports.getCategory = async(req, res)=>{
    try{
        let categoryId = req.params.id;
        let category = await Category.findOne({_id: categoryId});
        if(!category) return res.status(404).send({message: 'Category not found'});
        return res.send({message: 'Category found', category});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error getting category'});
    }
}

exports.updateCategory = async(req, res)=>{
    try{
        let categoryId = req.params.id;
        let params = req.body;
        let categoryAlready = await Category.findOne({name: params.name});
        if(categoryAlready) return res.send({message: 'Category name already taken'});
        let updatedCategory = await Category.findOneAndUpdate(
            {_id: categoryId},
            params,
            {new: true}
        );
        if(!updatedCategory) return res.status(404).send({message: 'Category not found'});
        return res.send({message: 'Updated category', updatedCategory});
    }catch(err){
        console.log(err);
        return res.statu(500).send({message: 'Error updating category'});
    }
}

// NOTA: CREAR UNA CATEGORIA DEFAULT ANTES DE EJECUTAR
exports.deleteCategory = async(req, res)=>{
    try{
        let categoryId = req.params.id;
        let deletedCategory = await Category.findOneAndDelete({_id: categoryId});
        let defaultCategory = await Category.findOne({name: 'DEFAULT'});
        await Product.updateMany(
            {category: categoryId},
            { $set: {category: defaultCategory.id}},
            {new: true}
        );
        if(!deletedCategory) return res.status(404).send({message: 'Category not found or already deleted'});
        return res.send({message: 'Category deleted and associated products set to DEFAULT: ', deletedCategory});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error deleting category'});
    }
}