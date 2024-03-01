import React, { useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../features/userSlice";
import { Link } from "react-router-dom";

export const Register = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }
        dispatch(registerUser({ email, name, password }));
    };

    return (
        <>
            <section className='login'>
                <div className='container'>
                    <div className='backImg'>
                        <img src="" alt='' />
                        <div className='text'>
                            <h3>Register</h3>
                            <h1>My ACcount</h1>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <span>Email address</span>
                        <input className="allinput" type='text' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <span>Username * </span>
                        <input className="allinput" type='text' required value={name} onChange={(e) => setUsername(e.target.value)} />
                        <span>Password * </span>
                        <input className="allinput" type='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span>Confirm Password * </span>
                        <input className="allinput" type='password' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button className='button allbtn'>Register</button>
                        <Link to='/login'>  Login </Link>

                    </form>
                </div>
            </section>
        </>
    );
};