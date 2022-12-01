import React from 'react';
import { BiHistory } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
const HistorySearchFolder = () => {
    return (
        <div>
            <div className='w-full'>
                <ul className='flex flex-col '>
                    <li className='w-full  mt-2 first:mt-0 flex items-center justify-between'>
                        <a href='/' className='p-1 flex items-center w-full '>
                            <BiHistory size="20px" className='mr-2'/>
                            Lịch sử tìm kiếm
                        </a>
                        <MdDeleteOutline size='20px' color="gray" className='cursor-pointer hover:bg-gray-100 rounded-full' />
                    </li>
                    
                </ul>
            </div>

        </div>

    );
};

export default HistorySearchFolder;