import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { fetchData, deleteProduct } from '../../../features/dataSlice';
import "./productList.css";

export default function ProductList() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.data);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };



    return (
        <div className="productList">
            <div className="productListHeader">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <Link to="/newproduct">
                    <button className="productListCreate">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </Link>
            </div>
            {products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                <div key={product._id} className="productListItem">
                    <img className="productListImg" src={product.image} alt="" />
                    <div className="productListDetails">
                        <span>{product.name}</span>
                        <span>Stock: {product.countInStock}</span>
                        <span>Price: {product.price}</span>
                    </div>
                    <div className="productListActions">
                        <Link to={"/product/" + product._id}>
                            <button className="productListEdit">
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                        </Link>
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="productListDelete"
                            onClick={() => handleDelete(product._id)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}