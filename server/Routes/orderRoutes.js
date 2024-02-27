import express from 'express';
import asyncHandler from 'express-async-handler';
import protect from '../Middleware/AuthMiddleware.js';
import Order from '../Models/OrderModel.js';

import Stripe from 'stripe';


const stripe = new Stripe('sk_test_51O0h9OBS3qnH4coLGYIIpazYpEFeQXwRoXvugX9LFpCxXzY3CBAcbj85B3fyGgNP9rJ83GMv2rsqvLKzWv0HK4bU00JAxDByV0');
const orderRouter = express.Router();

// ROUTE STRIPE
orderRouter.post('/pay', asyncHandler(async (req, res) => {
    try {
        const { products } = req.body;

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
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the payment session' });
    }
}));

//! LOGIN

orderRouter.post(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        const { orderItems, 
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice 
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error('No order items');
            return;
        } else {
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            });

            const createdOrder = await order.save();

            res.status(201).json(createdOrder);
        }

    })
);

export default orderRouter;


