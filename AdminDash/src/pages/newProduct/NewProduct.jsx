import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../../features/dataSlice';
import "./newProduct.css";

export default function NewProduct() {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    countInStock: '',
    category: '' 
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Nouveau Produit</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Nom</label>
          <input type="text" name="name" value={productData.name} onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Image URL</label>
          <input type="text" name="image" value={productData.image} onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" name="description" value={productData.description} onChange={handleChange} />
        </div> 
        <div className="addProductItem">
          <label>Prix</label>
          <input type="text" name="price" value={productData.price} onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input type="text" name="countInStock" value={productData.countInStock} onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Catégorie</label>
          <select name="category" value={productData.category} onChange={handleChange}>
            <option value="">Choississez une catégorie</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-fiction">Non-fiction</option>
            <option value="Science">Science</option>
            <option value="Biography">Biographie</option>
            <option value="History">Histoire</option>
            <option value="Fantasy">Fantasy</option>
          </select>
        </div>
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}