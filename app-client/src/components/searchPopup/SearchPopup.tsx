import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { GrFormPrevious } from 'react-icons/gr'
import HistorySearch from './HistorySearch';
const SearchPopup = (props: any) => {
    return (

        <div className={`${props.openSearch ? 'block' : 'hidden'} md:hidden bg-white absolute top-0 w-screen h-screen z-50 py-3`}>
            <div className="flex items-center px-3">
                <GrFormPrevious onClick={() => props.setOpenSearch(!props.openSearch)} color='#393939' size='28px' className='' />
                <input type="text" name='search' className='mx-3 outline-none bg-[#e2e2e2] w-full rounded-md py-1 px-2' />
                <AiOutlineSearch color='#393939' size='30px' className='cursor-pointer' />
            </div>
            <HistorySearch />
        </div>


    );
};

export default SearchPopup;