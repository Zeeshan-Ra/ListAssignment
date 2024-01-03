import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const collectData = async () => {
        console.warn(name, email, password);
        let result = await fetch("https://list-assignmnet.onrender.com/register", {
            method: 'post',
            body: JSON.stringify({ name, email, password, phone }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user", JSON.stringify(result.result))
        localStorage.setItem("token", JSON.stringify(result.auth))

        navigate('/')
    }

    return (
        <div className="register">
            <h1 style={{ color: 'purple' }}>Register</h1>
            <input className="inputBox" type="text" placeholder="Enter Name"
                value={name} onChange={(e) => setName(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <input className="inputBox" type="password" placeholder="Enter Password"
                value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter phone number"
                value={phone} onChange={(e) => setPhone(e.target.value)}
            />
            <form className="inputBox">
                <p>Gender: </p>
                <label style={{margin: 50}}><input type="radio" name="gender" defaultChecked value="Male" />Male</label>
                <label style={{margin: 50}}><input type="radio" name="gender" value="Female" />Female</label>
                <label><input type="radio" name="gender" value="Others" />Others</label>
            </form>
            <form className="inputBox">
                <p>How did you hear about this?</p>
                <input type="checkbox" name="question" defaultChecked value="LinkedIn" />LinkedIn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="checkbox" name="question" value="Friends" />Friends&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="checkbox" name="question" value="JobPortal" />Job Portal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="checkbox" name="question" value="Others" />Others
            </form>
            <div className="inputBox">
                <p>City:</p>
                <select style={{width: 300, textAlign: "center"}}>
                    <option value="Mumbai">Mumbai</option>

                    <option value="Pune">Pune</option>

                    <option value="Ahmedabad">Ahmedabad</option>
                </select>
            </div>
            <button onClick={collectData} className="appButton" type="button">Sign Up</button>
        </div>
    )
}
export default SignUp
