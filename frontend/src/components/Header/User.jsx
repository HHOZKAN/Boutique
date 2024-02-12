import React, { useState } from "react";
import { IoSettingsOutline } from 'react-icons/io5';
import { BsBagCheck } from 'react-icons/bs';
import { AiOutlineHeart } from "react-icons/ai";
import { GrHelp } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../features/userSlice";



export const User = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = true;
    const [profileOpen, setProfileOpen] = useState(false);

    const close = () => {
        setProfileOpen(null);
    }
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/'); 
    }

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

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
                                {isAuthenticated ? (
                                    <Link to="/Account">
                                        <button className="box">
                                            <IoSettingsOutline className="icon" />
                                            <h4>My account</h4>
                                        </button>
                                    </Link>
                                ) : (
                                    <Link to="/register">
                                        <button className="box">
                                            <IoSettingsOutline className="icon" />
                                            <h4>Register</h4>
                                        </button>
                                    </Link>
                                )}
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
                                {isAuthenticated ? (
                                    <button className="box" onClick={handleLogout}>
                                        <BiLogOut className="icon" />
                                        <h4>Log Out</h4>
                                    </button>
                                ) : (
                                    <Link to="/Login">
                                        <button className="box">
                                            <BiLogOut className="icon" />
                                            <h4>Log In</h4>
                                        </button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </>
                ) : (<button>My account</button>)}
            </div>
        </>

    )
}