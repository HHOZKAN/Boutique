import express from 'express';
import asyncsHandler from 'express-async-handler';
import Product from '../Models/ProductModel.js';

const productRoute = express.Router();

// GET ALL Products
productRoute.get('/', asyncsHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products);
}));

// GET Product BY ID
productRoute.get('/:id', asyncsHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'product not found' });
    }
    res.json(product);
}));

export default productRoute;