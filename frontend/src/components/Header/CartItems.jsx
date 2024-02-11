import React from "react";
import { IoSettingsOutline } from 'react-icons/io5';
import { BsBagCheck } from 'react-icons/bs';
import { AiOutlineClose, AiOutlineHeart, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { GrHelp } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { cartActions } from "../../../features/cartSlice"
import { useDispatch } from "react-redux";


export const CartItems = ({ id, image, name, price, quantity, totalPrice }) => {
    const dispatch = useDispatch();

    const incCartItems = () => {
        dispatch(cartActions.addToCart({id, name, price, cover}));
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
                        <button className="remove flexCenter">
                            <AiOutlineClose />
                        </button>
                    </div>
                    <div className="details">
                        <p> {name} </p>
                        <label htmlFor="">Unit Price $ {price}</label>
                        <div className="price">
                            <div className="qty flexCenter">
                                <button className="plus" onClick={incCartItems}>
                                    <AiOutlinePlus />
                                </button>
                                <button className="num">{quantity}</button>
                                <button className="minus" onClick={descCartItems}>
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