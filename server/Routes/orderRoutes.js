import express from 'express';
import asyncHandler from 'express-async-handler';
import protect from '../Middleware/AuthMiddleware.js';
import Order from '../Models/OrderModel.js';
import jwt from 'jsonwebtoken';

import Stripe from 'stripe';


const stripe = new Stripe('sk_test_51O0h9OBS3qnH4coLGYIIpazYpEFeQXwRoXvugX9LFpCxXzY3CBAcbj85B3fyGgNP9rJ83GMv2rsqvLKzWv0HK4bU00JAxDByV0');
const orderRouter = express.Router();

// ROUTE STRIPE
orderRouter.post('/pay', protect, asyncHandler(async (req, res) => {
    try {
        const { products } = req.body;
        const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);

        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: product.name,
                },
                unit_amount: Math.round(product.price * 100),
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/paymentsuccess`,
            cancel_url: `${process.env.CLIENT_URL}/payementcancel`,
            customer_email: decodedToken.email,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the payment session' });
    }
}));

// GET payment details
orderRouter.get(
    '/payment/:sessionId',
    protect,
    asyncHandler(async (req, res) => {
        try {
            const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
            res.json(session);
        } catch (error) {
            console.error("Error occurred while getting payment details:", error);
            res.status(500).json({ message: error.message });
        }
    })
);

// GET all payments
orderRouter.get(
    '/payments',
    protect,
    asyncHandler(async (req, res) => {
        try {
            const payments = await stripe.checkout.sessions.list();
            res.json(payments);
        } catch (error) {
            console.error("Error occurred while getting payments:", error);
            res.status(500).json({ message: error.message });
        }
    })
);



//! LOGIN

orderRouter.post(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        console.log(req.body); // Log incoming data

        const { orderItems, shippingAddress, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error('No order items');
            return;
        } else {
            const order = new Order({
                user: req.user._id,
                orderItems,
                shippingAddress,
                totalPrice,
            });

            console.log(order); // Log the created order object

            try {
                const createdOrder = await order.save();
                console.log(createdOrder); // Log the saved order
                res.status(201).json(createdOrder);
            } catch (error) {
                console.error(error); // Log the error
                res.status(500).json({ message: 'Error creating order: ' + error.message });
            }
        }
    })
);

export default orderRouter;


