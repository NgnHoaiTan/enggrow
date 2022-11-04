import { unwrapResult } from '@reduxjs/toolkit';
import React, { useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { InputEvent } from '../../events/events';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { asyncSearchFolderByName } from '../../features/folder/folderApis';
import { getSearchList, resetSearchList } from '../../features/folder/folderSlice';
import SearchModel from './SearchModel';

// type CallbackFunction = (arg: any) => void;
// interface SearchFolderProps {
//     onSubmit: CallbackFunction | null
// }
// const defaultProps = {
//     onSubmit: null
// }

const SearchFolder = () => {
    const [showModelSearch, setShowModelSearch] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)

    const handleSearchTermChange = (e: InputEvent) => {
        setSearchTerm(e.target.value)
        if(!onSubmit) return
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
        if(e.target.value!=='') {
            typingTimeoutRef.current = setTimeout(() => {
                const formValues = {
                    name: e.target.value,
                    accessToken: accessToken
                }
                onSubmit(formValues)
                // call props function search
    
            }, 1000)
        }else {
            dispatch(resetSearchList())
        }
        
    }

    const onSubmit = async(dataSearch: any) => {
        try{
            
            const action = await dispatch(asyncSearchFolderByName(dataSearch))
            const result = unwrapResult(action)
        }catch(err){
            console.log(err)
        }
    }

    const onCloseModelSearch = () => {
        dispatch(resetSearchList())
        setSearchTerm('')
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
        setShowModelSearch(false)
    }
    return (
        <>
            <div onClick={() => setShowModelSearch(true)}
                className="flex mr-3 lg:mr-5 items-center relative outline-none border-none ring-gray-200 ring-1 focus:ring-gray-400 w-28 md:w-32 bg-white rounded-lg py-1 pr-3 pl-10 text-sm md:text-base cursor-pointer focus:border-blue-500 border-1">
                <AiOutlineSearch color='#9f9f9f' size='22px' className='absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer' />
                <input className="invisible" />
                <p className='absolute text-gray-400 text-sm md:text-base top-1/2 -translate-y-1/2'>Search</p>
            </div>
            <SearchModel searchTerm={searchTerm}  handleSearchTermChange={handleSearchTermChange} showModelSearch={showModelSearch} onClose={onCloseModelSearch} />
        </>

    );
};

export default SearchFolder;