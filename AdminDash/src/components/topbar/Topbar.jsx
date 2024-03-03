import React from "react";
import "./topbar.css"
import { User } from "./User";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Topbar = () => {

  return (
    <>
      <header className="header">
        <div className="scontainer flex">
          <div className='logo'>
            <Link to="">
              <div onClick={() => window.scrollTo(0, 0)} /> 
            ADMIN BOUTIQUE
            </Link>
          </div>
          <div className="account flexCenter">
            <User />
          </div>
        </div>
      </header>
    </>
  )
}