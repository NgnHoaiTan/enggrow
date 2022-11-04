import React from 'react';
import { SiWebmoney } from 'react-icons/si'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import * as yupphone from 'yup-phone'
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
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const phoneRegrex = /^(84|0[3|5|7|8|9])+([0-9]{8,9})\b/g
    console.log(initValues)
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
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        name: Yup.string().max(50).min(1),
        phone_number: Yup.string().matches(phoneRegrex, 'Phone number is not valid'),
    })
    const SubmitSignup = async (value: any) => {
        try {
            const action = await dispatch(asyncSignup(value))
            const result = unwrapResult(action)
            console.log(result)
            setInitValues(initialValues)
        } catch (error: any) {
            console.log(error)
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
                        <a href='/signup' className='p-2 hover:border-b-2'>Login</a>
                    </li>
                </ul>
            </nav>
            <section id='form-container' className="h-screen bg-white px-2 sm:relative">
                <div className="flex flex-col justify-between bg-form-login min-h-fit rounded-2xl mt-14 sm:w-3/6 md:w-[450px] md:mt-20 sm:absolute sm:left-1/2 sm:-translate-x-1/2  sm:rounded-3xl">
                    <Formik
                        enableReinitialize
                        initialValues={initValues}
                        validationSchema={validationSchema}
                        onSubmit={SubmitSignup}
                    >
                        {
                            (formProps) => (
                                <Form className='p-4 md:p-7'>
                                    <h3 className='text-center font-semibold text-xl md:text-2xl md:font-bold'>EngGrow Signup</h3>
                                    <p className='text-center text-16'>enter your account to access website</p>

                                    <div className='my-3 md:mt-5'>
                                        <p className='text-red-600 font-semibold text-center mb-1'>{errorSignup}</p>
                                        <label className='font-semibold md:text-lg' htmlFor="username">Username</label>
                                        <FastField as="input" required className='w-full mt-1 p-2 rounded-md focus:border-sky-600' type="text" id="username" name="username" />
                                        <p className='text-red-500 text-sm'>
                                            <ErrorMessage name='username' />
                                        </p>
                                    </div>
                                    <div className='my-3'>
                                        <label className='font-semibold md:text-lg' htmlFor="password">Password</label>
                                        <FastField as="input" required className='w-full mt-1 p-2 rounded-md focus:border-sky-600' type="password" id="password" name="password" />
                                        <p className='text-red-500 text-sm'>
                                            <ErrorMessage name='password' />
                                        </p>
                                    </div>
                                    <div className='my-3'>
                                        <label className='font-semibold md:text-lg' htmlFor="password">Confirm Password</label>
                                        <FastField as="input" required className='w-full mt-1 p-2 rounded-md focus:border-sky-600' type="password" id="verify_password" name="verifyPassword" />
                                        <p className='text-red-500 text-sm'>
                                            <ErrorMessage name='verifyPassword' />
                                        </p>
                                    </div>
                                    <div className='my-3'>
                                        <label className='font-semibold md:text-lg' htmlFor="password">Your name</label>
                                        <FastField as="input" required className='w-full mt-1 p-2 rounded-md focus:border-sky-600' type="text" id="name" name="name" />
                                        <p className='text-red-500 text-sm'>
                                            <ErrorMessage name='name' />
                                        </p>
                                    </div>
                                    <div className='my-3'>
                                        <label className='font-semibold md:text-lg' htmlFor="password">Phone</label>
                                        <FastField as="input" required className='w-full mt-1 p-2 rounded-md focus:border-sky-600' type="text" id="phone_number" name="phone_number" />
                                        <p className='text-red-500 text-sm'>
                                            <ErrorMessage name='phone_number' />
                                        </p>
                                    </div>

                                    <button type='submit' className='mt-3 w-full bg-[#8B7963] text-white font-semibold text-[18px] py-2 rounded-lg md:py-[14px]'>Sign up</button>
                                </Form>
                            )
                        }
                    </Formik>

                    <p className='my-3 text-base text-center md:text-lg'>Have an account ?
                        <Link to={'/login'}>
                            <span className='font-semibold underline ml-1'>Signin now</span>
                        </Link>
                    </p>
                </div>

            </section>
        </div>
    );
};

export default Signup;