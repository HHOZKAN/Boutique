import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitOrder, submitPayment } from '../../../features/orderSlice';
import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51O0h9OBS3qnH4coLP5gmzElRLQeJsmGp8iRCUAxUVG8CqAOF4UyaxopphfhkuKGfKQ13AEXjwWRzEz42xEBONMUy00FPBXjDwv');


export const PaymentComposant = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const cart2 = useSelector((state) => state.cart.itemsList);
    console.log('Cart:', cart2);
    const user = useSelector((state) => state.user);
    const stripe = useStripe();
    const [isOrderMade, setIsOrderMade] = useState(false);



    const makePayment = async () => {
        const body = {
            products: cart.itemsList,
        }
        const headers = {
            "Content-Type": "application/json",
        }
        const response = await fetch('http://localhost:5050/api/orders/pay', {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        })
        const session = await response.json();
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });
    };

    const makeOrder = async () => {
        const orderData = {
            token: user.token,
            cart: cart, // Ajoutez les données du panier ici
            // Ajoutez d'autres données de commande ici
        };
        await dispatch(submitOrder(orderData));
        setIsOrderMade(true); // Mettez à jour isOrderMade lorsque makeOrder est appelé
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
                        <p className="text-sm font-medium text-gray-900">Méthode de paiement</p>
                        <div>
                            <input type="radio" id="creditCard" name="paymentMethod" value="Credit Card" checked onChange={(e) => setPaymentMethod(e.target.value)} />
                            <label htmlFor="creditCard">Carte Bancaire</label>
                        </div>
                    </div>



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


                    <button
                        type="button"
                        onClick={makeOrder}
                        className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Validez votre commande
                    </button>

                    {isOrderMade && (
                        <button
                            type="button"
                            onClick={makePayment}
                            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Payer
                        </button>
                    )}               </div>
            </div >

        </>
    );

}


export const Payment = () => (
    <Elements stripe={stripePromise}>
        <PaymentComposant />
    </Elements>
);