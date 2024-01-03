import React from 'react';
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [mail, setMail] = React.useState('');
    const [error,setError] = React.useState(false);
    const navigate = useNavigate();

    const addProduct = async () => {

        if(!name || !phone || !mail)
        {
            setError(true);
            return false
        }
        navigate("/")

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, phone, mail, userId }),
            headers: {
                "Content-type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result)

    }

    return (
        <div className='product'>
            <h1 style={{color:'purple'}}>Add Product</h1>
            <input type="text" placeholder='Enter Name' className='inputBox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input type="text" placeholder='Enter phone number' className='inputBox'
                value={phone} onChange={(e) => { setPhone(e.target.value) }}
            />
            {error && !phone && <span className='invalid-input'>Enter valid phone number</span>}

            <input type="email" placeholder='Enter email address' className='inputBox'
                value={mail} onChange={(e) => { setMail(e.target.value) }}
            />
            {error && !mail && <span className='invalid-input'>Enter valid email</span>}


            <button onClick={addProduct} className='appButton'>Add Product</button>
        </div>
    )
}

export default AddProduct;