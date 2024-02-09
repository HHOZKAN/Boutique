import React, { useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../features/userSlice";
import { Link } from 'react-router-dom'; 


export const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    return (
        <>
            <section className='login'>
                <div className='container'>
                    <div className='backImg'>
                        <img src="" alt='' />
                        <div className='text'>
                            <h3>Login</h3>
                            <h1>My ACcount</h1>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <span>Username or Email address</span>
                        <input type='text' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <span>Password * </span>
                        <input type='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className='button'>Log in </button>

                        <Link to='/register'> Sing Up </Link>
                    </form>
                </div>
            </section>
        </>
    );
};