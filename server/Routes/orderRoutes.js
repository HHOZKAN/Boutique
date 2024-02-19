import express from 'express';
import asyncHandler from 'express-async-handler';
import protect from '../Middleware/AuthMiddleware.js';
import Order from '../Models/OrderModel.js';

import Stripe from 'stripe';


const stripe = new Stripe('sk_test_51O0h9OBS3qnH4coLGYIIpazYpEFeQXwRoXvugX9LFpCxXzY3CBAcbj85B3fyGgNP9rJ83GMv2rsqvLKzWv0HK4bU00JAxDByV0');
const orderRouter = express.Router();

// ROUTE STRIPE
orderRouter.post('/pay', asyncHandler(async (req, res) => {
    const { amount, id } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'EUR',
            description: 'Votre description',
            payment_method: id,
            confirm: true
        });
        console.log('Payment', payment);
        res.json({
            message: 'Paiement réussi',
            success: true
        });
    } catch (error) {
        console.log('Erreur', error);
        res.json({
            message: 'Paiement échoué',
            success: false
        });
    }
}));

//! LOGIN

orderRouter.post(
    '/',
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