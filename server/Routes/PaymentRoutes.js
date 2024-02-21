// import express from 'express';
// import dotenv from 'dotenv';
// import stripePackage from 'stripe';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import { Payment } from '../../frontend/src/pages/payment/Payment';

// dotenv.config();

// const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);
// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(cors());

// const PaymentRouteur = express.Router();

// PaymentRouteur.post("/payment", cors(), async (req, res) => {
//     let { amount, id } = req.body;
//     try {
//         const payment = await stripe.paymentIntents.create({
//             amount,
//             currency: "EUR",
//             description: "LE SAVOIR",
//             payment_method: id,
//             confirm: true
//         })
//         console.log("Payment", payment);
//         res.json({
//             message: "Paiement réussi",
//             success: true
//         })
//     }
//     catch (error) {
//         console.log("Error", error);
//         res.json({
//             message: "Erreur lors du paiement",
//             success: false
//         })
//     }
// });

// export default PaymentRouteur;