import React, { useState } from "react";
import { IoSettingsOutline } from 'react-icons/io5';
import { BsBagCheck } from 'react-icons/bs';
import { AiOutlineHeart } from "react-icons/ai";
import { GrHelp } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";

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
                        <button className="img" onClick={() => setProfileOpen(!profileOpen)}>
                            <img src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png" alt="" />
                        </button>

                        {profileOpen && (
                            <div className="openProfile boxItems" onClick={close}>
                                <div className="image">
                                    <div className="img">
                                        <img src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png" alt="" />
                                    </div>
                                    <div className="text">
                                        <h4>Eden Smith</h4>
                                        <label htmlFor=""> Paris, CA</label>
                                    </div>
                                </div>
                                <button className="box">
                                    <IoSettingsOutline className="icon" />
                                    <h4>My account</h4>
                                </button>
                                <button className="box">
                                    <BsBagCheck className="icon" />
                                    <h4>My Order</h4>
                                </button>
                                <button className="box">
                                    <AiOutlineHeart className="icon" />
                                    <h4>WishList</h4>
                                </button>
                                <button className="box">
                                    <GrHelp className="icon" />
                                    <h4>Help</h4>
                                </button>
                                <button className="box">
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