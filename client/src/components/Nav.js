import React from 'react';
import {
    Link, useNavigate
} from 'react-router-dom';
const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div>
            <img
            alt='logo'
            className='logo'
             src='https://www.logodesignlove.com/wp-content/uploads/2022/01/logo-wave-symbol-01.jpg' />
            {
                auth ?

                    <ul className="nav-ul">
                        <li><Link to="/">People</Link></li>
                        <li><Link to="/add">Add People</Link></li>
                        <li> <Link onClick={logout} to="/signup">Logout ({ JSON.parse(auth).name})</Link></li>
                    </ul>
                    :
                    <ul className="nav-ul nav-right">
                        <li> <Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
            }


        </div>
    )
}

export default Nav;
