import React, { useState } from "react"
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";


export const Card = () => {
    const [cardOpen, setCardOpen] = useState(false);
    const closeCard = () => {
        setCardOpen(false);
    }
    return (
        <>
            <div className="card" onClick={() => setCardOpen(!cardOpen)}>
             <BiShoppingBag className="cardIcon" />
             <span className="flexCenter">2</span>   
            </div>
            <div className={cardOpen ? "overlay": "nonoverlay"}></div>

            <div className={cardOpen ? "cartItem" : "carthide"}>
                <div className="title flex">
                    <h2>Shopping Cart</h2>
                    <button onClick={closeCard}>
                        <AiOutlineClose className="icon" />
                    </button>
                </div>
                {carr}
            </div>
        </>
    )
}