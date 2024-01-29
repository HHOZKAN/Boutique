import express from 'express';
import User from './models/UserModel.js';
import users from './data/users.js';
import Course from './Models/ProductModel.js';
import Products from './data/Products.js';
import asyncHandler from 'express-async-handler';

const ImportData = express.Router();

ImportData.post('/user', asyncHandler (
    async (req, res) => {
        await User.deleteMany({})
        const importUser = await User.insertMany(users)
        res.send({ importUser })
    }
));

ImportData.post('/Products', asyncHandler (
    async (req, res) => {
        await Products.deleteMany({})
        const importProducts = await Products.insertMany(Products)
        res.send({ importProducts })
    }
));

export default ImportData;

