import React, { useState } from 'react';
import { Modal } from 'flowbite-react/lib/esm/components';
import { AiOutlineSearch } from 'react-icons/ai';
import { InputEvent } from '../../events/events';
import { useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';

// import ResultSearchFolder from './ResultSearchFolder';

interface searchModelProps {
    showModelSearch: boolean,
    onClose:()=>void

}
const SearchModel = (props: searchModelProps) => {
    const location = useLocation()
    const [dataInput, setDataInput] = useState('')
    const [search, setSearch] = useSearchParams();
    const handleChangeSearchTerm =(e:InputEvent)=>{
        setDataInput(e.target.value)
        const searchValue = {
            name: e.target.value
        }
    }

    const handleKeyDownSearch =(e: any) => {
        const searchValue = {
            name: e.target.value
        }
        if(e.key === 'Enter') {
            // call function change parameter
            if(e.target.value !== '') {
                setSearch(searchValue)
            }
            else if(e.target.value === '') {
                setSearch()
            }
            setDataInput('')
            props.onClose()
        }

        
    }
    return (
        <div>
            <Modal
                show={props.showModelSearch}
                onClose={props.onClose}
            >
                <Modal.Header>
                    <div className='relative w-60 sm:w-96 md:w-[450px] '>
                        <AiOutlineSearch color='#9f9f9f' size='25px' className='absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer' />
                        <input
                            onKeyDown={handleKeyDownSearch}
                            value={dataInput}
                            onChange={(e) => handleChangeSearchTerm(e)}
                            type="text" name='name' placeholder='type name to search' autoComplete='off' className='outline-none border-none focus:border-none focus:outline-none focus:ring-transparent w-full bg-white rounded-lg py-1 pr-3 pl-10' />
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='h-[100px] overflow-y-auto'>
                    </div>
                </Modal.Body>

            </Modal>
        </div>
    );
};

export default SearchModel;