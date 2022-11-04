import React from 'react';
import bootsVocab from "../images/boots-vocab-review.jpg";
import courseReview from "../images/course-review.png";
import callReview from "../images/call-video-review.png";
import heroImage from "../images/heroimage.jpeg";
import { useNavigate } from "react-router-dom";
import {SiWebmoney} from 'react-icons/si'
interface Nav {
    name: string,
    url: string
}
const Redirect: Nav[] = [
    {
        name:'Login',
        url:'/login'
    },
    {
        name:'Signup',
        url:'/signup'
    },
]
const Landingpage = () => {
    let navigate = useNavigate();
    return (
        <div className='h-screen'>
            <nav className='flex bg-navbar py-2 items-center flex-shrink-0 justify-between px-5 md:px-10 fixed top-0 w-full z-50 shadow'>
                <div className='w-8 md:w-10'>
                    <SiWebmoney color='#393939' size='100%'/>
                </div>
                <ul className='invisible sm:visible sm:flex text-[#393939]'>
                    {
                        Redirect.map((item, index) => {
                            return (
                                <li key={index} className='first:mr-3 font-medium'>
                                    <a href={item.url} className='p-2 hover:border-b-2'>{item.name}</a>
                                </li>
                            )

                        })
                    }
                </ul>
            </nav>
            <section className='md:flex items-center md:justify-between md:h-5/6 h-72 pt-20'>
                <div className='hidden md:block md:items-center md:justify-self-center md:w-1/2'>
                    {/* <div className='rounded-full w-96 h-96 bg-slate-400 mx-auto bg-cover'>
                        
                    </div> */}
                    <img src={heroImage} alt="hero img" className="rounded-full object-cover bg-transparent mx-auto bg-cover" />
                </div>
                <div className='text-center md:text-left md:w-1/2'>
                    <h1 className='font-bold text-2xl mb-1 md:text-7xl md:mb-4 lg:w-2/3 md:leading-tight'>Boost your
                        English</h1>
                    <p className='w-2/3 my-0 mx-auto md:text-left md:mx-0 md:text-2xl md:mb-5'>Make yourself better and connect people around the world</p>
                    <div className='hidden sm:block'>
                        <button className='rounded-xl sm:text-xl lg:text-2xl text-white bg-violet-700 py-2 px-7'>Join now</button>
                    </div>
                    <div className='visible sm:invisible flex justify-center items-center mt-3'>
                        <button className='rounded-lg text-white text-16 bg-violet-600 py-1 px-2 mr-2' onClick={()=>navigate('/login')}>
                            Login
                        </button>
                        <button className='rounded-lg text-white text-16 bg-sky-600 py-1 px-2 ml-2'  onClick={()=>navigate('/signup')}>
                            Signup
                        </button>
                    </div>
                </div>
            </section>
            {/* why choose us */}
            <section id='why-choose-us' className='md:my-10'>
                <h2 className='text-center font-semibold text-xl py-2 md:text-3xl md:font-bold'>Why choose us ?</h2>
                <div className='mt-5 sm:mt-14 md:flex sm:items-center sm:justify-center'>
                    <div className='md:w-1/2'>
                        <img src={bootsVocab} alt="review" className='w-2/3 mx-auto' />
                    </div>
                    <div className='px-1 w-5/6 mx-auto md:w-1/2 md:px-10 relative'>
                        <h3 className='text-center text-lg font-bold text-violet-500 mb-2 md:text-left md:text-2xl lg:text-3xl'>Boost your vocabularies with flashcard</h3>
                        <p className='text-16 text-center md:text-left md:text-lg lg:text-2xl md:font-light'>
                            By create flashcard and note word, you can learn it any where and any time by connect internet.
                            This is also a very effective way to test your knowledge, since you'll need to review the cards repeatedly
                        </p>
                        <div className="after:content-[''] after:absolute after:w-10 after:h-10 lg:after:w-28 lg:after:h-28 after:rounded-full after:bg-blue-600 opacity-10 blur-md -z-10">
                        </div>
                        <div className="after:content-[''] after:absolute after:right-7 after:-top-20 after:w-14 after:h-14 lg:after:w-36 lg:after:h-36 after:rounded-full after:bg-blue-600 opacity-20 blur-md after:-z-10">
                        </div>
                    </div>
                </div>
                <div className='mt-5 sm:mt-14 md:flex sm:items-center sm:justify-center md:flex-row-reverse'>
                    <div className='md:w-1/2'>
                        <img src={courseReview} alt="review" className='w-2/3 mx-auto' />
                    </div>
                    <div className='px-1 w-5/6 mx-auto md:w-1/2 md:px-10'>
                        <h3 className='text-center text-lg font-bold text-violet-500 mb-2 md:text-right md:text-2xl lg:text-3xl'>Take part in online courses</h3>
                        <p className='text-16 text-center md:text-right md:text-lg lg:text-2xl md:font-light'>
                            By create flashcard and note word, you can learn it any where and any time by connect internet.
                            This is also a very effective way to test your knowledge, since you'll need to review the cards repeatedly
                        </p>
                        <div className="after:content-[''] after:absolute after:-top-20 after:w-14 after:h-14 lg:after:w-36 lg:after:h-36 after:rounded-full after:bg-violet-600 opacity-20 blur-md after:-z-10">
                        </div>
                        <div className="after:content-[''] after:absolute after:right-0 after:w-10 after:h-10 lg:after:w-28 lg:after:h-28 after:rounded-full after:bg-red-600 opacity-10 blur-md -z-10">
                        </div>
                        
                    </div>
                </div>
                <div className='mt-5 sm:mt-14 md:flex sm:items-center sm:justify-center'>
                    <div className='md:w-1/2'>
                        <img src={callReview} alt="review" className='w-2/3 mx-auto' />
                    </div>
                    <div className='px-1 w-5/6 mx-auto md:w-1/2 md:px-10'>
                        <h3 className='text-center text-lg font-bold text-violet-500 mb-2 md:text-left md:text-2xl lg:text-3xl'>Online video call with friends</h3>
                        <p className='text-16 text-center md:text-left md:text-lg lg:text-2xl md:font-light'>
                            By create flashcard and note word, you can learn it any where and any time by connect internet.
                            This is also a very effective way to test your knowledge, since you'll need to review the cards repeatedly
                        </p>
                        <div className="after:content-[''] after:absolute after:w-10 after:h-10 lg:after:w-28 lg:after:h-28 after:rounded-full after:bg-orange-500 opacity-20 blur-md -z-10">
                        </div>
                        <div className="after:content-[''] after:absolute after:right-7 after:-top-20 after:w-14 after:h-14 lg:after:w-36 lg:after:h-36 after:rounded-full after:bg-yellow-600 opacity-20 blur-md after:-z-10">
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default Landingpage;