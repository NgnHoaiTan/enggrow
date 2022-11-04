import React from 'react';
import { IoAdd } from 'react-icons/io5';

const MyCourses = () => {
    return (
        <div className='my-4'>
            <h2 className='font-bold text-lg mb-3'>My Live Courses</h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-6  sm:grid-cols-3 lg:gap-6 md:grid-cols-4">
                <div className="grid-item">
                    <div className="card rounded-xl overflow-hidden h-[232px] shadow-card">
                        <div className="top-card h-[120px]">
                            <img src='images/democourse.jpg' className='w-full h-full object-cover' alt='course' />
                        </div>
                        <div className="content-card p-2 h-full">
                            <p className='font-semibold line-clamp-2'>How to become a Pro pronunciation dasfdsafdsaf</p>
                            <div className="flex justify-center mt-2 lg:mt-3 w-full">
                                <button className='rounded-md py-2 px-2 w-full bg-violet-500 text-white text-sm font-semibold'>Read more</button>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="grid-item">
                    <div className="card rounded-xl overflow-hidden h-[232px] shadow-card">
                        <div className="top-card h-[120px]">
                            <img src='images/democourse.jpg' className='w-full h-full object-cover' alt='course' />
                        </div>
                        <div className="content-card p-2 h-full">
                            <p className='font-semibold line-clamp-2'>How to become a Pro pronunciation dasfdsafdsaf</p>
                            <div className="flex justify-center mt-2 lg:mt-3 w-full">
                                <button className='rounded-md py-2 px-2 w-full bg-violet-500 text-white text-sm font-semibold'>Read more</button>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="grid-item block sm:hidden md:block">
                <div className="card rounded-xl overflow-hidden h-[232px] shadow-card">
                        <div className="top-card h-[120px]">
                            <img src='images/democourse.jpg' className='w-full h-full object-cover' alt='courese' />
                        </div>
                        <div className="content-card p-2 h-full">
                            <p className='font-semibold line-clamp-2'>How to become a Pro pronunciation dasfdsafdsaf</p>
                            <div className="flex justify-center mt-2 lg:mt-3 w-full">
                                <button className='rounded-md py-2 px-2 w-full bg-violet-500 text-white text-sm font-semibold'>Read more</button>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="grid-item relative cursor-pointer">
                    <div className="card-add-course bg-gray-50 rounded-xl overflow-hidden h-[232px] border-dashed border-2 border-indigo-600">
                        <div className="icon-add absolute left-1/2 top-1/3 -translate-y-1/4 -translate-x-1/2 hover:scale-105 duration-500 ease-in-out">
                            <div className='w-10 mx-auto'>
                                <IoAdd size="100%" color='#5d5d5d' />
                            </div>
                            <p className='font-semibold text-gray-500 text-center'>Add new course</p>

                        </div>
                        
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyCourses;