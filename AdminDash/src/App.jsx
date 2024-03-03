import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import { Topbar } from './components/topbar/Topbar';
import Home from './pages/home/Home';
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import { SignIn } from './pages/sign/SignIn';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser } from '../features/userSlice';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(restoreUser(token));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/*" element={
          isAuthenticated ? (
            <>
              <Topbar />
              <div className='container'>
                <Sidebar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/user/:userId" element={<User />} />
                  <Route path="/newUser" element={<NewUser />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/product/:productId" element={<Product />} />
                  <Route path="/newproduct" element={<NewProduct />} />
                </Routes>
              </div>
            </>
          ) : isAuthenticated === false ? <Navigate to="/signin" /> : null
        } />
      </Routes>
    </Router>
  );
}

export default App;