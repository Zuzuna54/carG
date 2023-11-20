import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './sideBar/Sidebar';
import Header from './header/Header';
import './Layout.scss';

function PublicLayout() {
    return (

        <div className='main-page'>
            <Header />
            <div className='main-page-content'>
                <SideBar />
                <div className='mainPage-content-container'>
                    <Outlet />
                </div>
            </div>

        </div>

    );
}

export default PublicLayout;
