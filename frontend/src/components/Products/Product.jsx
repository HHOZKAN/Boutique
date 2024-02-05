import React, { useEffect } from "react"
import "./product.css"
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../features/dataSlice";
import { ProductCart } from "./ProductCart";


export const Product = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.data);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <>
      <section className='product'>
        <div className='container grid3'>
          {products.map((item) => (
            <ProductCart key={item.id} id={item.id} cover={item.image} name={item.name} price={item.price} />
          ))}
        </div>
      </section>
    </>
  )
}