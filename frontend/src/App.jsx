import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header.jsx";
import { Home } from "./pages/home/Home";
import { Footer } from "./components/Footer/Footer.jsx";
import { Login } from "./pages/login/Login.jsx";
import { Register } from "./pages/login/Register.jsx";

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       dispatch(restoreUser(token));
//     }
//   }, [dispatch]);
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;