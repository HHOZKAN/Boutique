import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;