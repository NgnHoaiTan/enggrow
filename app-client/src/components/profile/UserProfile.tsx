import React from 'react';
import { BiEditAlt } from 'react-icons/bi';
import demouser from '../../images/demouser.jpg'
import TodayCourse from './TodayCourse';
import { AiOutlineCamera } from 'react-icons/ai';
import Statistic from './Statistic';

const UserProfile = () => {
    
    return (
        <div>
            <div className="cover-top">
                <div className="relative">
                    <div className="cover-image w-full">
                        <div className='w-full h-[200px] md:h-[300px] lg:h-[400px] bg-gradient-to-br from-[#98d8e9] to-[#ddb9b9]'>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex flex-col lg:flex-row items-start justify-between ">
                <div className="relative statistic-profile w-full lg:w-3/5 px-4 lg:px-10  pt-16 sm:pt-20 md:pt-24 lg:pt-[120px]">
                    <div className="avatar absolute top-0  -translate-y-1/2 left-1/2 -translate-x-1/2  w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-56 lg:h-56 border-[6px] border-white rounded-full">
                        <img src={demouser} alt="avatar user" className='w-full h-full object-cover bg-center rounded-full' />
                        <div className="change-avatar w-8 lg:w-10 absolute bottom-0 right-0 md:-translate-x-1/2 hover:scale-[1.05] duration-75 ease-in border-4 border-white rounded-full">
                            <AiOutlineCamera color='white' size="100%" className='cursor-pointer p-1 bg-blue-300 rounded-full'/>
                        </div>
                    </div>
                    <div className="basic-info ">
                        <h3 className='font-semibold text-xl lg:text-2xl text-center'>Arika Jakoe</h3>
                        <div className="about-me flex items-center justify-center mt-2">
                            <p className='text-center text-lg text-gray-700 mr-2'>
                                It can be challenging to write about yourself.
                            </p>
                            <BiEditAlt size="18px" color='#454545' className='cursor-pointer' />
                        </div>
                    </div>
                    <div className="statistic mt-5">
                        <Statistic />
                    </div>
                </div>
                <div className="remind-schedule w-full h-screen lg:ml-3 lg:w-2/5 p-3">
                    <div className='flex items-center'>
                        <h3 className='text-2xl my-2'>Hello, <span className='font-semibold'>Arika Jakoe</span></h3>
                        <img className='animate-wiggle w-7 ml-2' src='https://upload.wikimedia.org/wikipedia/commons/7/70/Emoji_u1f44b.svg' alt='wave hand' />
                    </div>
                    <p className='max-w-[400px]'>Nice to have you back. What an exciting day! Get ready and continue your lesson today.</p>
                    <div className="today-course my-3">
                        <h2 className='text-lg font-bold mb-2'>Today's Course</h2>
                        <TodayCourse />
                        <TodayCourse />
                        <TodayCourse />
                        <TodayCourse />
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;