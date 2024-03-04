import React from "react";
import Svg from '../../assets/react.svg'
import "./header.css"
import { AiOutlineSearch } from 'react-icons/ai';
import { Card } from "./Card";
import { User } from "./User";
import { Link } from "react-router-dom";

export const Header = () => {
    window.addEventListener("scroll", function () {
        const header = document.querySelector(".header")
        header.classList.toggle("active", this.window.scrollY > 100)
    })
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
    return (
        <>
            <header className="header">
                <div className="scontainer flex">
                    <div className='logo'>
                        <Link to=""><div onClick={() => window.scrollTo(0, 0)}  /> ETHEREE </Link>
                    </div>
                    <div className="search flex">
                        <AiOutlineSearch className='searchIcon' />
                        <input type="text" placeholder='Search...' />
                    </div>
                    <div className="account flexCenter">
                        <Card />
                        <User />
                    </div>
                </div>
            </header>
        </>
    )
}