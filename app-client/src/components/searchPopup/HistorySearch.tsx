import React from 'react';
import {IoCloseOutline} from 'react-icons/io5'
const HistorySearch = () => {
    return (
        <div>
            <div className='mb-3'>
                <p className='font-semibold text-base'>Tìm kiếm gần đây</p>
            </div>
            <div className='w-full'>
                <ul className='flex flex-col '>
                    <li className='w-full odd:bg-gray-100 relative'>
                        <a href='/' className='py-4 px-6 block'>Grid Template Row</a>
                        <IoCloseOutline size='20px' color="gray" className='absolute top-1/2 right-5 -translate-y-1/2'/>
                    </li>
                    <li className='w-full odd:bg-gray-100 relative'>
                        <a href='/' className='py-4 px-6 block'>Grid Template Row</a>
                        <IoCloseOutline size='20px' color="gray" className='absolute top-1/2 right-5 -translate-y-1/2'/>
                    </li>
                    <li className='w-full odd:bg-gray-100 relative'>
                        <a href='/' className='py-4 px-6 block'>Grid Template Row</a>
                        <IoCloseOutline size='20px' color="gray" className='absolute top-1/2 right-5 -translate-y-1/2'/>
                    </li>
                </ul>
            </div>
        </div>

    );
};

export default HistorySearch;