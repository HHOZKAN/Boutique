import React, { useState, useEffect } from "react";
import "./topbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, getUserProfile } from "../../../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faShoppingBag, faHeart, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';



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
                                <button className="box allbtn" onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
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

                            <Link to="/signin">
                                <button className="box allbtn" onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
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