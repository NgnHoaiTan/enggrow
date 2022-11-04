import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppDispatch } from '../../app/store';
import { FormSubmitEvent, InputEvent } from '../../events/events';
import { asyncLogin } from '../../features/authentication/authAPIs';

const LoginForm = () => {
    const [dataLogin, setDataLogin] = useState({
        username: '',
        password:'',
    })
    const [errorLogin, setErrorLogin] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const handleInput=(e: InputEvent)=>{
        setDataLogin((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleLogin =async(e: FormSubmitEvent) => {
        e.preventDefault()
        try{
            console.log(dataLogin)
            await dispatch(asyncLogin(dataLogin)).unwrap()
            navigate('/')
        }catch(error: AxiosError | any){
            if(error.message) {
                setErrorLogin(error.message)
            }
            console.log(error)
        }
    }
    return (
        <div className='bg-white w-full min-h-[550px] max-h-fit mx-3 sm:mx-0 sm:w-[450px] p-3 rounded-xl'>
            <div className="mt-5 flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full max-auto">
                    <img src="https://res.cloudinary.com/hoaitan/image/upload/v1667311147/engrow/image_processing20210907-13511-1juj33d_xrlfla.gif"
                        alt='robot'
                        className='w-full h-full object-cover rounded-full'
                    />
                </div>

                <h1 className='font-bold mt-3 text-2xl md:text-3xl xl:text-3xl mb-5 text-center'>Login</h1>
            </div>

            <form 
            onSubmit={handleLogin}
            className='flex flex-col justify-between p-3'>
                <div>
                    <input required type="text" name='username' placeholder='username'
                        className='p-3 my-3 w-full border-[1px] rounded-lg outline-none focus:ring-2 focus:ring-violet-700'
                        onChange={handleInput}
                    />
                    <input
                        required
                        onChange={handleInput}
                        className='p-3 my-3 w-full border-[1px] rounded-lg outline-none focus:ring-2 focus:ring-violet-700'
                        type="password" name="password" id="password" placeholder='password' />

                </div>

                <button type='submit'
                    className='bg-gradient-to-r from-[#3494E6] to-[#EC6EAD]
                    px-3 py-4 rounded-xl text-white font-bold my-3 flex items-center justify-center'
                >
                    <BsFillArrowRightCircleFill color='white' size="20px" className='mr-2' /> Continue
                </button>
            </form>

        </div>
    );
};

export default LoginForm;