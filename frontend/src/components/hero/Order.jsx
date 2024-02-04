import React from "react";
import "./slider.css";
import { order } from "../../assets/data/data.js";

export const Order = () => { 
return (
    <>
    <section className="order">
        <div className="container grid boxItems">
            {order.map((item) => (
                <div className="box floxCenter" key={(item.id)}>
                    <div className="num">
                        <h1>{item.id}</h1>
                    </div>
                    <div className="text">
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
    </>

)
}