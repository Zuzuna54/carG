import React from 'react';
import './Header.scss';

const Header = () => {
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
            <div className="logo-container right">
                {/* Right logo placeholder */}
                <img src="right-logo.png" alt="Right Logo" className="logo" />
            </div>
        </header>
    );
};

export default Header;
