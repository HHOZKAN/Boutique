import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { restoreUser } from '../features/userSlice';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(restoreUser(token));
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> {/* Nouvelle route ajoutée */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;