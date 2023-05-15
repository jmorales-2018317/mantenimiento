'use strict'

const Product = require('../models/product.model');
const Category = require('../models/category.model');

exports.testProduct = (req, res)=>{
    return res.send({message: 'Function running'});
}

exports.saveProduct = async(req, res)=>{
    try{
        //name, price, stock
        let params = req.body;
        const product = new Product(params);
        await product.save();
        return res.send({message: 'Saved product', product});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error saving product'});
    }
}

exports.getProducts = async(req, res)=>{
    try{
        //get all products
        const products = await Product.find().populate('category'); //120ms
        return res.send({message: 'Products found', products});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error getting products'});
    }
}

exports.getProduct = async(req, res)=>{
    try{
        //get one product
        let productId = req.params.id;
        let product = await Product.findOne({_id: productId})
        .lean();
        delete product.stock;
        return res.send(product);
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error gettin product'});
    }
}

exports.updateProduct = async(req, res)=>{
    try{
        //get data to update
        //get id product
        let productId = req.params.id;
        let params = req.body;
        let categoryExist = await Category.findOne({_id: params.category})
        if(!categoryExist) return res.status(404).send({message: 'Category not found and not updated'});
        let updatedProduct = await Product.findOneAndUpdate({_id: productId}, params, {new:true});
        return res.send({message: 'Product updated successfully', updatedProduct});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error updating product'});
    }
}

exports.deleteProduct = async(req, res)=>{
    try{
        //delete product
        //get id product
        let productId = req.params.id;
        let deletedProduct = await Product.findOneAndDelete({_id: productId});
        return res.send({message: 'Product deleted successfully', deletedProduct});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error removing product'});
    }
}