import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { CartItems } from "./CartItems";
import { fetchData } from '../../../features/dataSlice';

export const Card = () => {
    const [cardOpen, setCardOpen] = useState(false);
    const closeCard = () => {
        setCardOpen(false);
    }
    const products = useSelector((state) => state.data.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    let total = 0
    const itemsLists = useSelector((state) => state.cart.itemsList)
    itemsLists.forEach((item) => {
        total += item.totalPrice
    })
    const cartItems = useSelector((state) => state.cart.itemsList);
    const quantity = useSelector((state) => state.cart.totalQuantity);

    return (
        <>
            <div className='card' onClick={() => setCardOpen(!cardOpen)}>
                <BiShoppingBag className='cardIcon' />
                <span className='flexCenter'>{quantity}</span>
            </div>
            <div className={cardOpen ? "overlay" : "nonoverlay"}></div>

            <div className={cardOpen ? "cartItem" : "cardhide"}>
                <div className='title flex'>
                    <h2>Shopping Cart</h2>
                    <button onClick={closeCard}>
                        <AiOutlineClose className='icon' />
                    </button>
                </div>
                {cartItems.map((product) => (
                    <CartItems
                        id={product.id}
                        cover={product.cover}
                        name={product.name}
                        price={product.price}
                        quantity={product.quantity}
                        totalPrice={product.totalPrice} />
                ))}

                <div className='checkOut'>
                    <button>
                        <span>Proceed To Checkout</span>
                        <label htmlFor=''>${total}</label>
                    </button>
                </div>
            </div>
        </>
    )
}