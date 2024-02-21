import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Header } from "./components/Header/Header.jsx";
import { Home } from "./pages/home/Home";
import { Footer } from "./components/Footer/Footer.jsx";
import { Login } from "./pages/login/Login.jsx";
import { Register } from "./pages/login/Register.jsx";
import { Account } from "./pages/account/Account.jsx";
import { restoreUser } from '/features/userSlice';
import { Shipping } from "./pages/payment/Shipping.jsx";
import { Payment } from "./pages/payment/Payment.jsx";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(restoreUser(token));
    }
  }, [dispatch]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;