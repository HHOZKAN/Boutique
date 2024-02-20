import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitOrder } from '../../../features/orderSlice';
import { loadStripe } from '@stripe/stripe-js';


export const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const dispatch = useDispatch();

    const stripePromise = loadStripe('pk_test_51O0h9OBS3qnH4coLP5gmzElRLQeJsmGp8iRCUAxUVG8CqAOF4UyaxopphfhkuKGfKQ13AEXjwWRzEz42xEBONMUy00FPBXjDwv');

    const cart = useSelector((state) => state.cart);

    const handlePayment = async () => {
        const orderData = {
            orderItems: cart.itemsList,
            shippingAddress: cart.shippingAddress,
            paymentMethod: paymentMethod
        };

        if (paymentMethod === 'Credit Card') {
            const stripe = await stripePromise;
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                console.log('Erreur lors de la création du token de carte:', error);
            } else {
                orderData.paymentMethodId = paymentMethod.id;
            }
        }

        dispatch(submitOrder(orderData));
    };
    return (

        <>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div className="px-4 pt-8">
                    <p className="text-xl font-medium">Détails du panier</p>
                    <p className="text-gray-400">Regardez vos articles et choisissez votre moyen de paiement</p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                        {cart.itemsList.map((item) => (
                            <div className="flex flex-col rounded-lg bg-white sm:flex-row" key={item.id}>
                                <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={item.image} alt={item.name} />
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
                        <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Porte Carte</label>
                        <div className="relative">
                            <input type="text" id="card-holder" name="card-holder" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Votre nom entier" />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                </svg>
                            </div>
                        </div>
                        <label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">Détails cartes</label>
                        <div className="flex">
                            <div className="relative w-7/12 flex-shrink-0">
                                <input type="text" id="card-no" name="card-no" className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="xxxx-xxxx-xxxx-xxxx" />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                                    </svg>
                                </div>
                            </div>
                            <input type="text" name="credit-expiry" className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="MM/YY" />
                            <input type="text" name="credit-cvc" className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="CVC" />
                        </div>
                    </>
                )}

                <div className="mt-6 border-t border-b py-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Prix articles </p>
                        <p className="font-semibold text-gray-900"> {cart.itemsList.price} </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Livraison</p>
                        <p className="font-semibold text-gray-900">$8.00</p>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Total</p>
                    <p className="text-2xl font-semibold text-gray-900">$408.00</p>
                </div>

                <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white" onClick={handlePayment}>Payer</button>
            </div>
        </div >

        </>
    );
}