import React, { useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../features/userSlice";
import { Link, useNavigate } from 'react-router-dom'; 

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
        navigate('/'); 
    };

    return (
        <>
            <section className='login'>
                <div className='container'>
                    <form onSubmit={handleSubmit}>
                        <span>Username or Email address</span>
                        <input className="allinput" type='text' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <span>Password * </span>
                        <input className="allinput" type='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className='button allbtn'>Log in </button>

                        <Link to='/register'> Sing Up </Link>
                    </form>
                </div>
            </section>
        </>
    );
};