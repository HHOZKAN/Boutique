import express from 'express';
import User from './models/UserModel.js';
import users from './data/users.js';
import asyncHandler from 'express-async-handler';
import products from './data/Products.js';
import Product from './Models/ProductModel.js';

const ImportData = express.Router();

ImportData.post('/user', asyncHandler (
    async (req, res) => {
        await User.deleteMany({})
        const importUser = await User.insertMany(users)
        res.send({ importUser })
    }
));

ImportData.post('/products', asyncHandler (
    async (req, res) => {
        await Product.deleteMany({})
        const importProducts = await Product.insertMany(products)
        res.send({ importProducts })
    }
));

export default ImportData;

