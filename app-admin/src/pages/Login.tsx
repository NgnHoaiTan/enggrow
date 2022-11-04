import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
    return (
        <div className='w-full min-h-screen bg-gradient-to-r from-[#1c8e5e] to-[#23596e] flex justify-center items-center'>
            <LoginForm />
        </div>
    );
};

export default Login;