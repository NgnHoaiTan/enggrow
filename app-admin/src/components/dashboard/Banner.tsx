import React from 'react';

const Banner = () => {
    return (
        <div className='bg-violet-500 w-full rounded-xl h-[150px] sm:h-[200px] md:h-[250px] relative p-5'>
            <div className="welcome-title flex flex-col sm:justify-center items-center sm:items-start h-full">
                <div className="flex sm:mb-2 z-10">
                    <h3 className='text-white font-semibold sm:text-2xl lg:text-3xl mr-2'>Welcome back, <span className='font-bold'>Johny</span></h3>
                    <div className='w-6 md:w-8 lg:w-9'>
                        <img src='images/wavehand.png' className='w-full animate-wiggle' alt='wavehand' />
                    </div>

                </div>

                <p className='text-white sm:text-xl'>Have a nice day</p>

            </div>

            <div className='drop-shadow-xl absolute w-[100px] sm:w-[200px] md:w-[250px] lg:w-[250px] right-0 -translate-x-1/3 top-1/2 -translate-y-6 sm:-translate-y-1/2'>
                <img src='images/robot2.png' className='animate-floating' alt='robot-welcome' />
            </div>

        </div>
    );
};

export default Banner;