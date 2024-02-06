import React from "react";
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";

export const Footer = () => {
    return (
        <>
            <footer className="boxItems">
                <div className="container flex">
                    <p> Ozkan Hasan -- All right reserved - Design and Developed BY ME</p>
                    <div className="social">
                        <BsFacebook className="icon" />
                        <AiFillTwitterCircle className="icon" />
                        <AiFillLinkedin className="icon" />
                        <RiInstagramFill className="icon" />

                    </div>
                </div>
            </footer>
        </>
    );
}