import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [mail, setMail] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getProductDetails = async () => {
        console.warn(params)
        let result = await fetch(`https://list-assignmnet.onrender.com/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPhone(result.phone);
        setMail(result.mail);
    }

    const updateProduct = async () => {
        console.warn(name, phone, mail)
        let result = await fetch(`https://list-assignmnet.onrender.com/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, phone, mail }),
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        result = await result.json();
        if (result) {
            navigate('/')
        }

    }

    return (
        <div className='product'>
            <h1 style={{color:'purple'}}>Update Product</h1>
            <input type="text" placeholder='Enter product name' className='inputBox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />

            <input type="text" placeholder='Enter phone number' className='inputBox'
                value={phone} onChange={(e) => { setPhone(e.target.value) }}
            />

            <input type="email" placeholder='Enter email address' className='inputBox'
                value={mail} onChange={(e) => { setMail(e.target.value) }}
            />


            <button onClick={updateProduct} className='appButton'>Update Product</button>
        </div>
    )
}

export default UpdateProduct;
