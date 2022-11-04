import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BsPlayFill } from 'react-icons/bs'
const Video = () => {
    return (
        <div className='bg-white shadow-card rounded-xl overflow-hidden'>
            <div className="relative mb-3">
                <div className="top-card h-[120px]">
                    <img src='images/democourse.jpg' className='w-full h-full object-cover' alt='banner' />
                </div>
                
                <div className="absolute  right-0 -translate-x-3 -translate-y-1/2">
                    <div className="rounded-full w-10 h-10 -top-4 bg-white border-gray-100 drop-shadow-sm items-center">
                        <BsPlayFill size='30px' color='#393939' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                    </div>
                </div>
                <div className='absolute bottom-0 p-2'>
                    <div className='flex items-center'>
                        <AiOutlineEye color='white' size="20px" />
                        <p className='ml-1 text-white sm:text-sm text-xs'>42345</p>
                    </div>

                </div>
            </div>
            <div className="p-2">
                <p className='font-semibold text-base mb-1 line-clamp-2'>Tiếng Anh du lịch: Làm thủ tục ở sân bay</p>

                <button className='mt-3 w-full rounded-md font-semibold bg-[#6e5943] hover:bg-[#63503c] text-white text-sm text-center py-2'>Read more</button>
            </div>


        </div>
    );
};

export default Video;