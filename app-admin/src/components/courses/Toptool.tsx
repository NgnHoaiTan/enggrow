import React, { useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { RiAddFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { InputEvent } from '../../events/events';
import CreateModel from './CreateModel';
import SearchModel from './SearchModel';
const Toptool = () => {
    const [showFormCreate, setShowFormCreate] = useState(false)
    const [showModelSearch, setShowModelSearch] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const dispatch = useDispatch<AppDispatch>()

    const onCloseFormCreate = () => {
        setShowFormCreate(false)
    }



    const onCloseModelSearch = () => {
        // dispatch(resetSearchList())
        setSearchTerm('')
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
        setShowModelSearch(false)
    }

    return (
        <div className='flex justify-start items-center'>
            <div className="btn-add">
                <button 
                onClick={()=>setShowFormCreate(true)}
                className='px-5 py-2 rounded-lg bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] text-white font-bold hover:'>
                    <span className='hidden md:block'>
                        Add new course
                    </span>
                    <span className='block md:hidden'>
                        <RiAddFill size='20px' color='#fffff' />
                    </span>
                </button>
            </div>
            <div className="search ml-5">

                <div
                    onClick={() => setShowModelSearch(true)}
                    className="flex items-center relative outline-none border-none ring-gray-400 ring-1 focus:ring-violet-600 w-[200px] md:w-[300px] bg-white rounded-lg py-2 pr-3 pl-10 text-sm md:text-base cursor-pointer focus:border-blue-500 border-1">
                    <AiOutlineSearch color='#9f9f9f' size='22px' className='absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer' />
                    <input className="invisible" />
                    <p className='absolute text-gray-400 text-base top-1/2 -translate-y-1/2'>Search</p>
                </div>


            </div>
            <SearchModel showModelSearch={showModelSearch} onClose={onCloseModelSearch} />
            <CreateModel showFormCreate={showFormCreate} onClose={onCloseFormCreate} />
        </div>
    );
};

export default Toptool;