import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('https://list-assignmnet.onrender.com/products', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        console.warn(id)
        let result = await fetch(`https://list-assignmnet.onrender.com/product/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`https://list-assignmnet.onrender.com/search/${key}`);
            result = await result.json()
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts();
        }

    }

    return (
        <div className="product-list">
            <h1 style={{ color: 'purple' }}>List</h1>
            <input type="" className='search-product-box' placeholder='Search Product'
                onChange={searchHandle}
            />
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Phone</li>
                <li>Email</li>
                <li>Operation</li>

            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.phone}</li>
                        <li>{item.mail}</li>
                        <li>
                            <button className='btnn' onClick={() => deleteProduct(item._id)}>Delete</button>&nbsp;&nbsp;
                            <Link className='linkk' to={"/update/" + item._id} >Update</Link>
                        </li>

                    </ul>
                )
                    : <h1>No Result Found</h1>
            }
        </div>
    )
}

export default ProductList;
