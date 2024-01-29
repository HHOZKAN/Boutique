import express from 'express';
import asyncsHandler from 'express-async-handler';
import cours from '../Models/ProductModel.js';

const coursRoute = express.Router();

// GET ALL COURSES
coursRoute.get('/', asyncsHandler(async (req, res) => {
    const courses = await cours.find({})
    res.json(courses);
}));

// GET COURSE BY ID
coursRoute.get('/:id', asyncsHandler(async (req, res) => {
    const product = await cours.findById(req.params.id);
    if (courses) {
        res.json(courses);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
    res.json(courses);
}));

export default coursRoute;