import React, { useState } from "react";
import { IoSettingsOutline } from 'react-icons/io5';
import { BsBagCheck } from 'react-icons/bs';
import { AiOutlineHeart } from "react-icons/ai";
import { GrHelp } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

export const User = () => {
    const user = true;
    const [profileOpen, setProfileOpen] = useState(false);

    const close = () => {
        setProfileOpen(null);
    }
    return (

        <>
            <div className="profile">
                {user ? (
                    <>
                        <button className="img allbtn" onClick={() => setProfileOpen(!profileOpen)}>
                            <img src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png" alt="" />
                        </button>

                        {profileOpen && (
                            <div className="openProfile boxItems" onClick={close}>
                                <div className="image">
                                    <Link to="/Account">
                                        <div className="img">
                                            <img src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png" alt="" />
                                        </div>
                                    </Link>
                                    <div className="text">
                                        <h4>Eden Smith</h4>
                                        <label htmlFor=""> Paris, CA</label>
                                    </div>
                                </div>
                                <Link to="/Account">
                                    <button className="box allbtn">
                                        <IoSettingsOutline className="icon" />
                                        <h4>My account</h4>
                                    </button>
                                </Link>
                                <button className="box allbtn">
                                    <BsBagCheck className="icon" />
                                    <h4>My Order</h4>
                                </button>
                                <button className="box allbtn">
                                    <AiOutlineHeart className="icon" />
                                    <h4>WishList</h4>
                                </button>
                                <button className="box allbtn">
                                    <GrHelp className="icon" />
                                    <h4>Help</h4>
                                </button>
                                <button className="box allbtn">
                                    <BiLogOut className="icon" />
                                    <h4>Log Out</h4>
                                </button>
                            </div>
                        )}
                    </>
                ) : (<button>My account</button>)}
            </div>
        </>

    )
}