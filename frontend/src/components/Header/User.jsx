import React, { useState, useEffect } from "react";
import { IoSettingsOutline } from 'react-icons/io5';
import { BsBagCheck } from 'react-icons/bs';
import { AiOutlineHeart } from "react-icons/ai";
import { GrHelp } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from '../../../features/cartSlice';
import { logoutUser, getUserProfile } from "../../../features/userSlice";



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

        dispatch(cartActions.resetCart());

        localStorage.removeItem('cart');

        navigate('/');
    };

    const token = useSelector(state => state.user.token);

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const name = useSelector(state => state.user.user?.name);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getUserProfile());
        }
    }, [isAuthenticated, dispatch]);


    return (

        <>
            <div className="profile">
                {isAuthenticated ? (
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
                                        <h4>{name}</h4>
                                        <label htmlFor=""> Omeiwa Mu Shindeiru</label>
                                    </div>
                                </div>
                                <Link to="/Account">
                                    <button className="box allbtn">
                                        <IoSettingsOutline className="icon" />
                                        <h4>Mon compte</h4>
                                    </button>
                                </Link>

                                <Link to="/payment">
                                    <button className="box allbtn">
                                        <BsBagCheck className="icon" />
                                        <h4>Ma commande </h4>
                                    </button>
                                </Link>

                                <button className="box allbtn">
                                    <AiOutlineHeart className="icon" />
                                    <h4>Favoris</h4>
                                </button>

                                <button className="box allbtn">
                                    <GrHelp className="icon" />
                                    <h4>Aide</h4>
                                </button>
                                
                                <button className="box allbtn" onClick={handleLogout}>
                                    <BiLogOut className="icon" />
                                    <h4>Se déconnecter</h4>
                                </button>
                            </div>
                        )}
                    </>
                ) : (<>
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

                            </div>
                            <Link to="/register">
                                <button className="box allbtn">
                                    <IoSettingsOutline className="icon" />
                                    <h4>Créer un compte</h4>
                                </button>
                            </Link>
                            <Link to="/login">
                                <button className="box allbtn" onClick={handleLogout}>
                                    <BiLogOut className="icon" />
                                    <h4>Se connecter</h4>
                                </button>
                            </Link>
                        </div>
                    )}
                </>

                )}
            </div>
        </>

    )
}