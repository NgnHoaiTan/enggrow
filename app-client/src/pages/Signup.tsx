import React, { useState } from 'react';
import { SiWebmoney } from 'react-icons/si'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { Formik, Form, FastField, ErrorMessage } from 'formik'
import { FormSubmitEvent } from '../events/events';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { asyncSignup } from '../features/authentication/authAPIs';
const initialValues = {
    username: '',
    password: '',
    verifyPassword: '',
    name: '',
    phone_number: ''
}
const Signup = () => {
    const [initValues, setInitValues] = React.useState(initialValues)
    const [errorSignup, setErrorSignup] = React.useState('')
    const [successSignup, setSuccessSignup] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const phoneRegrex = /^(84|0[3|5|7|8|9])+([0-9]{8,9})\b/g
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .max(16)
            .min(6)
        ,
        password: Yup.string()
            .max(16)
            .min(6),
        verifyPassword: Yup.string()
            .max(16)
            .min(6)
            .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp với nhau'),
        name: Yup.string().max(50).min(1),
        phone_number: Yup.string().matches(phoneRegrex, 'Số điện thoại không đúng định dạng'),
    })
    const SubmitSignup = async (value: any) => {
        try {
            setSuccessSignup(()=>'')
            const action = await dispatch(asyncSignup(value))
            const result = unwrapResult(action)
            setInitValues(initialValues)
            setSuccessSignup(()=>'Đăng ký thành công')
        } catch (error: any) {
            if (error.status === 400) {
                setErrorSignup(error.message)
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
                        <a href='/login' className='p-2 hover:border-b-2'>Đăng nhập</a>
                    </li>
                </ul>
            </nav>
            <section id='form-container' className="h-screen bg-white px-2 sm:relative my-5">
                <div className="flex flex-col justify-between bg-white drop-shadow-lg shadow-card min-h-fit rounded-2xl mt-14 sm:w-3/6 md:w-[450px] md:mt-20 sm:absolute sm:left-1/2 sm:-translate-x-1/2  sm:rounded-3xl">
                    <p className='text-green-500 text-lg font-semibold text-center my-3 '>{successSignup}</p>
                    <Formik
                        enableReinitialize
                        initialValues={initValues}
                        validationSchema={validationSchema}
                        onSubmit={SubmitSignup}
                    >
                        {
                            (formProps) => (
                                <Form className='p-4 md:p-7'>
                                    <h3 className='text-center font-semibold text-xl md:text-2xl md:font-bold'>Đăng ký EngGrow</h3>
                                    <div className='my-3 md:mt-5'>
                                        <p className='text-red-600 font-semibold text-center mb-1'>{errorSignup}</p>
                                        <label className='font-semibold md:text-lg' htmlFor="username">Tài khoản</label>
                                        <FastField as="input" required className='w-full mt-1 p-2 rounded-md focus:border-sky-600' type="text" id="username" name="username" />
                                        <p className='text-red-500 text-sm'>
                                            <ErrorMessage name='username' />
                                        </p>
                                    </div>
                                    <div className='my-3'>
                                        <label className='font-semibold md:text-lg' htmlFor="password">Mật khẩu</label>
                                        <FastField as="input" required className='w-full mt-1 p-2 rounded-md focus:border-sky-600' type="password" id="password" name="password" />
                                        <p className='text-red-500 text-sm'>
                                            <ErrorMessage name='password' />
                                        </p>
                                    </div>
                                    <div className='my-3'>
                                        <label className='font-semibold md:text-lg' htmlFor="password">Xác nhận Mật khẩu</label>
                                        <FastField as="input" required className='w-full mt-1 p-2 rounded-md focus:border-sky-600' type="password" id="verify_password" name="verifyPassword" />
                                        <p className='text-red-500 text-sm'>
                                            <ErrorMessage name='verifyPassword' />
                                        </p>
                                    </div>
                                    <div className='my-3'>
                                        <label className='font-semibold md:text-lg' htmlFor="password">Họ tên</label>
                                        <FastField as="input" required className='w-full mt-1 p-2 rounded-md focus:border-sky-600' type="text" id="name" name="name" />
                                        <p className='text-red-500 text-sm'>
                                            <ErrorMessage name='name' />
                                        </p>
                                    </div>
                                    <div className='my-3'>
                                        <label className='font-semibold md:text-lg' htmlFor="password">Số điện thoại</label>
                                        <FastField as="input" required className='w-full mt-1 p-2 rounded-md focus:border-sky-600' type="text" id="phone_number" name="phone_number" />
                                        <p className='text-red-500 text-sm'>
                                            <ErrorMessage name='phone_number' />
                                        </p>
                                    </div>

                                    <button type='submit' className='mt-3 w-full bg-[#8B7963] text-white font-semibold text-[18px] py-2 rounded-lg md:py-[14px]'>Đăng ký</button>
                                </Form>
                            )
                        }
                    </Formik>

                    <p className='my-3 text-base text-center md:text-lg'>Đã có tài khoản?
                        <Link to={'/login'}>
                            <span className='font-semibold underline ml-1'>Đăng nhập</span>
                        </Link>
                    </p>
                </div>

            </section>
        </div>
    );
};

export default Signup;