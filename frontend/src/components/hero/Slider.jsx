import React from "react";
import "./slider.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export const Slider = () => {
    return (
        <>
            <div className="slider">
                <div className="container grid">
                    {slide.map((product, i) => (
                       <div className="box" key={i}>
                        <div className="img">
                          <img src={product.image} alt="" />  
                        </div>
                       </div> 
                    ) )}
                </div>
            </div>
        </>
    )
}