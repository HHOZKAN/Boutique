import React from "react"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { cartActions } from "../../../features/cartSlice"
import { ToastContainer, toast } from 'react-toastify'; // Importez react-toastify
import 'react-toastify/dist/ReactToastify.css';

export const ProductCart = ({ id, cover, name, price }) => {

  const dispatch = useDispatch()
  const addToCart = () => {
    toast("Chef-d'œuvre ajouté au panier !");
    dispatch(cartActions.addToCart({ id, name, price, cover }));
  };
  return (
    <div className='box boxItems' id='product'>
      <div className='img'>
        <Link>
          <img src={cover} alt='cover' />
        </Link>
      </div>
      <div className='details'>
        <h3>${price}</h3>
        <p>{name}</p>
        <button onClick={addToCart}>
          <ToastContainer
            position="bottom-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <AiOutlinePlusCircle />
        </button>
      </div>
    </div>
  )
}