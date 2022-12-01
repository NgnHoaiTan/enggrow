import React from 'react';
import { Outlet, Navigate } from 'react-router';
import { useAppSelector } from './app/hooks';
import { getCurrentToken } from './features/authentication/authSlice';
const PrivateRoute = () => {
    const token = useAppSelector(getCurrentToken)
    // console.log(token)
    let auth = {token:token}
    return (
        auth.token ? <Outlet /> : <Navigate to={"/login"} />
    );
};

export default PrivateRoute;