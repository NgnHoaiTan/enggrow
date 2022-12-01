import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { SiWebmoney } from 'react-icons/si'
import { useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../app/store';
import { FormSubmitEvent, InputEvent } from '../events/events';
import { asyncLogin } from '../features/authentication/authAPIs';
const Login = () => {
    const [data, setData] = React.useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate()
    const [errorLogin, setErrorLogin] = React.useState('')
    const dispatch = useDispatch<AppDispatch>()
    const handleSetDataLogin = (e: InputEvent) => {
        setData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        })

        )
    }
    const handleSubmit = async (e: FormSubmitEvent) => {
        e.preventDefault()
        try {
            const action = await dispatch(asyncLogin(data))
            unwrapResult(action)
            setData(prevState => ({
                ...prevState,
                username: '',
                password: ''
            }))
            setTimeout(()=>{
                navigate('/folders')
            },200)
            
            

        } catch (error: any) {
            console.log(error)
            if (error.statusCode=== 401) {
                setErrorLogin('username or password is incorrect')
                setData(prevState => ({
                    ...prevState,
                    username: '',
                    password: ''
                }))
            }
        }



    }

    return (
        <div>
            {/* ==================Navbar============== */}
            <nav className='flex bg-navbar py-2 items-center flex-shrink-0 justify-between px-5 md:px-10 fixed top-0 w-full z-50 shadow'>
                <div className='w-8 md:w-10'>
                    <SiWebmoney color='#393939' size='100%' />
                </div>
                <ul className='sm:flex text-[#393939]'>
                    <li className='first:mr-3 font-medium'>
                        <a href='/signup' className='p-2 hover:border-b-2'>Đăng ký</a>
                    </li>
                </ul>
            </nav>
            <section id='form-container' className="h-screen bg-white px-2 sm:relative">
                <div className="flex flex-col justify-between bg-white drop-shadow-lg shadow-card h-3/4 rounded-2xl mt-14 sm:w-3/6 md:w-[450px] md:mt-20 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:h-4/5 sm:rounded-3xl">
                    <form className='p-4 md:p-7' onSubmit={handleSubmit}>
                        <h3 className='text-center font-semibold text-xl md:text-2xl md:font-bold'>Đăng nhập EngGrow</h3>
                        <div className='my-3 md:mt-5'>
                            <label className='font-semibold md:text-lg' htmlFor="username">Tên người dùng</label>
                            <input

                                required
                                value={data.username}
                                onChange={(e) => handleSetDataLogin(e)}
                                className='w-full mt-1 p-2 rounded-md focus:border-sky-600' type="text" id="username" name="username" />
                        </div>

                        <div className='my-3'>
                            <label className='font-semibold md:text-lg' htmlFor="password">Mật khẩu</label>
                            <input
                                required
                                value={data.password}
                                onChange={(e) => handleSetDataLogin(e)}
                                className='w-full mt-1 p-2 rounded-md focus:border-sky-600' type="password" id="password" name="password" />
                        </div>
                        <div className="error-message">
                            <p className='text-red-600'>{errorLogin}</p>
                        </div>
                        {/* <Link to={'/forgot'}>
                            <p className='underline'>Forgot your password ?</p>
                        </Link> */}

                        <button type='submit' className='mt-3 w-full bg-[#8B7963] text-white font-semibold text-[18px] py-2 rounded-lg md:py-[14px]'>Đăng nhập</button>
                    </form>
                    <p className='my-3 text-base text-center md:text-lg'>Chưa có tài khoản? 
                        <Link to={'/signup'}>
                            <span className='font-semibold underline ml-1'>Đăng ký</span>
                        </Link>

                    </p>
                </div>

            </section>
        </div>
    );
};

export default Login;