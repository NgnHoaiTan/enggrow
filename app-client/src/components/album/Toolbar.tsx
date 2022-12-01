import React, { useRef, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { InputEvent } from '../../events/events';

import CreateAlbum from './CreateAlbum';
import SearchFolder from './SearchFolder';
const Toolbar = () => { 
    const [showFormCreate, setShowFormCreate] = useState(false)
    const [search, setSearch] = useSearchParams();
    const location = useLocation()
    const navigate = useNavigate()
    
    const onCloseFormCreate = () => {
        setShowFormCreate(false)
    }
    const handleSelectFilter = (e: any) => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams({
                filter: e.target.value
            }).toString()
        });
    }
    
    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>

                    <SearchFolder />
                    <div className="choose-level ">
                        <select 
                        onChange={handleSelectFilter}
                        value={search.get('filter') || 'all'}
                        className='bg-white text-sm sm:text-base border border-solid border-gray-300 w-32 sm:w-40 rounded-md px-2 py-1 focus:border-blue-600 focus:outline-none bg-clip-padding bg-no-repeat'>
                            <option value="all">
                                Tất cả
                            </option>
                            <option value="due">
                                Tới hạn
                            </option>
                        </select>
                    </div>
                </div>
                <div className='button-create'>
                    <button onClick={()=>setShowFormCreate(true)} className='bg-blue-600 flex items-center px-2 py-1 text-sm sm:text-base sm:px-3 sm:py-1 rounded-md text-white outline-none border-none'>
                        <BsPlus color='white' size="20px" />
                        <p className='hidden sm:block'>Tạo mới</p>
                    </button>
                </div>
            </div>
            
            <CreateAlbum showFormCreate={showFormCreate} onClose={onCloseFormCreate} />
        </div>

    );
};

export default Toolbar;