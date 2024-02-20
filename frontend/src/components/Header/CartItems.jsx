import React, { useEffect } from "react";
import { IoSettingsOutline } from 'react-icons/io5';
import { BsBagCheck } from 'react-icons/bs';
import { AiOutlineClose, AiOutlineHeart, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { GrHelp } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { cartActions } from "../../../features/cartSlice"
import { useDispatch, useSelector } from "react-redux";



export const CartItems = ({ id, image, name, price, quantity, totalPrice }) => {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        if (cart.itemsList.length === 0) {
            const localStorageCart = localStorage.getItem('cart');
            if (localStorageCart) {
                dispatch(cartActions.setCart(JSON.parse(localStorageCart)));
            }
        }
    }, [dispatch, cart]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);




    const incCartItems = () => {
        dispatch(cartActions.addToCart({ id, name, price, cover }));
    }
    const descCartItems = () => {
        dispatch(cartActions.removeFromCart(id));
    }
    return (

        <>
            <div className="cardList" key={id}>
                <div className="cartContent">
                    <div className="img">
                        <img src={image} alt="" />
                    </div>
                    <div className="details">
                        <p> {name} </p>
                        <label htmlFor="">Unit Price $ {price}</label>
                        <div className="price">
                            <div className="qty flexCenter">
                                <button className="plus allbtn" onClick={incCartItems}>
                                    <AiOutlinePlus />
                                </button>
                                <button className="num allbtn">{quantity}</button>
                                <button className="minus allbtn" onClick={descCartItems}>
                                    <AiOutlineMinus />
                                </button>
                            </div>

                            <div className="priceTitle">${totalPrice}</div>


                        </div>
                    </div>
                </div>
            </div>
           
              
        </>

    )
}