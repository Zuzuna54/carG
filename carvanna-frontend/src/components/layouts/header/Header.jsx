import React from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticationStatus, setUser } from '../../../redux/actions/authActions';
import Cookies from 'js-cookie';



const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = Cookies.get('accessToken') || '';

    const returnLogInButton = () => {

        return (
            <button className='log-in-btn' onClick={() => navigate('/login')}>Log In</button>
        );

    }

    const handleLogOut = () => {

        //SET TOKEN TO EMPTY STRING
        Cookies.set('accessToken', '');
        Cookies.set('refreshToken', '');

        dispatch(setAuthenticationStatus(false));
        dispatch(setUser({}));
        navigate('/dashboard/homepage')

    }

    const returnLogOutButton = () => {

        return (
            <button className='log-in-btn' onClick={() => handleLogOut()}>Log Out</button>
        );

    }

    return (
        <header className="header">
            <div className="logo-container left">
                {/* Left logo placeholder */}
                <img src="left-logo.png" alt="Left Logo" className="logo" />
            </div>
            <div className="title-container">
                <h1 className="title">Your App Title</h1>
                {/* You can add more information or content here */}
            </div>
            {token ? returnLogOutButton() : returnLogInButton()}
        </header>
    );
};

export default Header;
