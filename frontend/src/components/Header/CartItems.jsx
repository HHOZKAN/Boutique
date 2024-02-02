import React from "react";
import { IoSettingsOutline } from 'react-icons/io5';
import { BsBagCheck } from 'react-icons/bs';
import { AiOutlineClose, AiOutlineHeart, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { GrHelp } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";

export const CartItems = ({ id, cover, name, price, quantity, totalPrice }) => {

    return (

        <>
            <div className="cardList" key={id}>
                <div className="cartCortent">
                    <div className="img">
                        <img src="{cover}" alt="" />
                        <button className="remove flexCenter">
                            <AiOutlineClose />
                        </button>
                    </div>
                    <div className="details">
                        <p> {name} </p>
                        <label htmlFor="">Unit Price $ {price}</label>
                        <div className="price">
                            <div className="qty flexCenter">
                                <button className="plus">
                                    <AiOutlinePlus />
                                </button>
                                <button className="num">{quantity}</button>
                                <button className="minus">
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