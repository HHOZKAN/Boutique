import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../features/userSlice";
import { Link, useNavigate } from 'react-router-dom';

export const SignIn = () => {
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
                    <div className='backImg'>
                        <div className='text'>
                            <h3>Login</h3>
                            <h1>ADMIN ETHEREE</h1>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div><span>Username or Email address</span> </div>
                        <input className="allinput" type='text' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div> <span>Password * </span> </div>
                        <input className="allinput" type='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div>
                            <button className='button allbtn'>Log in </button>
                        </div>
                        <Link to='/register'> Sing Up </Link>
                    </form>
                </div>
            </section>
        </>
    );
};

