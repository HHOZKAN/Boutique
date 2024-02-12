import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../../features/userSlice';
import image from "../../assets/images/input.png"
import "./account.css"

export const Account = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name ? user.name : '');
  const [email, setEmail] = useState(user && user.email ? user.email : '');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ name, email, password, token: user.token }));
  }

  return (
    <>
      <section className='accountInfo'>
        <div className='container boxItems'>
          <h1>Account Information</h1>
          <div className='content'>
            <div className='left'>
              <div className='img flexCenter'>
                <input className="allinput" type='file' accept='image/*' src={image} alt='imgs' />
                <img src={image} alt='' className='image-preview' />
              </div>
            </div>
            <div className='right'>
              <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input className="allinput" type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                <label>Email</label>
                <input className="allinput" type='text' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Password * </label>
                <input className="allinput" type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className='button' type='submit'>Update</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}