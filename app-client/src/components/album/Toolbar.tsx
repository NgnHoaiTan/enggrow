import React, { useRef, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { InputEvent } from '../../events/events';

import CreateAlbum from './CreateAlbum';
import SearchFolder from './SearchFolder';
const Toolbar = () => { 
    const [showFormCreate, setShowFormCreate] = useState(false)
    
    const onCloseFormCreate = () => {
        setShowFormCreate(false)
    }
    
    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className='flex items-center'>

                    <SearchFolder />
                    
                </div>
                <div className='button-create'>
                    <button onClick={()=>setShowFormCreate(true)} className='bg-blue-600 flex items-center px-2 py-1 text-sm sm:text-base sm:px-3 sm:py-1 rounded-md text-white outline-none border-none'>
                        <BsPlus color='white' size="25px" />
                        <p className='hidden sm:block'>Create new</p>
                    </button>
                </div>
            </div>
            
            <CreateAlbum showFormCreate={showFormCreate} onClose={onCloseFormCreate} />
        </div>

    );
};

export default Toolbar;