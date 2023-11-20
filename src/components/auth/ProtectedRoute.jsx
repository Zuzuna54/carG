// ProtectedRoute.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {

    const isAuthenticated = useSelector((state) => state.authState.isAuthenticated);

    return isAuthenticated ? (<Outlet />) : (<Navigate replace to='/401' />);
}

export default ProtectedRoutes;