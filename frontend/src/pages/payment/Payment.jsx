import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitOrder, submitPayment } from '../../../features/orderSlice'; // Importez l'action submitPayment
import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51O0h9OBS3qnH4coLP5gmzElRLQeJsmGp8iRCUAxUVG8CqAOF4UyaxopphfhkuKGfKQ13AEXjwWRzEz42xEBONMUy00FPBXjDwv'); // Remplace 'ta_cle_publique_de_stripe' par ta clé publique de Stripe

const PaymentComponent = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const stripe = useStripe();
    const elements = useElements();

    const handlePayment = async () => {
        const orderData = {
            orderItems: cart.itemsList,
            shippingAddress: cart.shippingAddress,
            paymentMethod: paymentMethod
        };

        if (paymentMethod === 'Credit Card') {
            
            const paymentData = {
                amount: totalWithShipping * 100, 
                token: user.token,
            };

            const clientSecret = await dispatch(submitPayment(paymentData)).unwrap();

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: 'John Doe',
                    },
                },
            });

            if (result.error) {
                console.log('Erreur lors de la confirmation du paiement:', result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    // Le paiement a réussi
                    orderData.paymentMethodId = result.paymentIntent.id;
                }
            }
        }

        dispatch(submitOrder(orderData));
    };

    const totalPrice = cart.itemsList.reduce((total, item) => total + item.totalPrice, 0);
    const totalWithShipping = totalPrice + 8;




    return (

        <>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div className="px-4 pt-8">
                    <p className="text-xl font-medium">Détails du panier</p>
                    <p className="text-gray-400">Regardez vos articles et choisissez votre moyen de paiement</p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                        {cart.itemsList.map((item) => (
                            <div className="flex flex-col rounded-lg bg-white sm:flex-row" key={item.id}>
                                <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={item.cover} alt={item.name} />
                                <div className="flex w-full flex-col px-4 py-4">
                                    <span className="font-semibold">{item.name} x {item.quantity}</span>
                                    <span className="float-right text-gray-400">{item.size}</span>
                                    <p className="">Prix unitaire {item.price} €</p>
                                    <p className="text-lg font-bold">Prix total {item.totalPrice} €</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Information paiement</p>
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-900">Choisissez votre méthode de paiement</p>
                        <div>
                            <input type="radio" id="paypal" name="paymentMethod" value="Paypal" onChange={(e) => setPaymentMethod(e.target.value)} />
                            <label htmlFor="paypal">Paypal</label><br />
                            <input type="radio" id="creditCard" name="paymentMethod" value="Credit Card" onChange={(e) => setPaymentMethod(e.target.value)} />
                            <label htmlFor="creditCard">Carte Bancaire</label>
                        </div>
                    </div>

                    {paymentMethod === 'Credit Card' && (
                        <>
                            <CardElement />

                        </>
                    )}

                    <div className="mt-6 border-t border-b py-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Prix articles </p>
                            <p className="font-semibold text-gray-900"> {totalPrice.toFixed(2)} € </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Livraison</p>
                            <p className="font-semibold text-gray-900">$8.00</p>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Total</p>
                        <p className="text-2xl font-semibold text-gray-900">{totalWithShipping.toFixed(2)} €</p></div>

                    <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white" onClick={handlePayment}>Payer</button>
                </div>
            </div >

        </>
    );

}

export const Payment = () => (
    <Elements stripe={stripePromise}>
        <PaymentComponent />
    </Elements>
);

