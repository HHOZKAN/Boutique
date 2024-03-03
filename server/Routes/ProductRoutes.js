import express from 'express';
import asyncsHandler from 'express-async-handler';
import Product from '../Models/ProductModel.js';

const productRoute = express.Router();

// GET ALL Products
productRoute.get('/', asyncsHandler(async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error("Error occurred while getting products:", error);
        res.status(500).json({ message: error.message });
    }
}));

// GET Product BY ID
productRoute.get('/:id', asyncsHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error("Error occurred while getting product:", error);
        res.status(500).json({ message: error.message });
    }
}));

// POST a new product
productRoute.post('/', asyncsHandler(async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
            countInStock: req.body.countInStock
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error("Error occurred while creating product:", error);
        res.status(500).json({ message: error.message });
    }
}));

// DELETE a product
productRoute.delete('/:id', asyncsHandler(async (req, res) => {
    try {
        console.log("Attempting to delete product with ID:", req.params.id);
        const product = await Product.findByIdAndDelete(req.params.id);

        if (product) {
            console.log("Product removed successfully");
            res.json({ message: 'Product removed' });
        } else {
            console.log("Product not found");
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error("Error occurred while deleting product:", error);
        res.status(500).json({ message: error.message });
    }
}));

export default productRoute;