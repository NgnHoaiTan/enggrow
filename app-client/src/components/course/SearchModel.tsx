import React, { useState } from 'react';
import { Modal } from 'flowbite-react/lib/esm/components';
import { AiOutlineSearch } from 'react-icons/ai';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

interface searchModelProps {
    showModelSearch: boolean,
    onClose: () => void
}
const SearchModel = (props: searchModelProps) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [name, setName] = useState('')

    const handleCloseModel = () => {
        setName(()=>'')
        props.onClose()
    }
    const handleSetSearch = (e: any) => {
        if (e.key === 'Enter') {
            navigate({
                pathname: location.pathname,
                search: createSearchParams({
                    name: e.target.value
                }).toString()
            });
            handleCloseModel()
        }

    }
    return (
        <div>
            <Modal
                show={props.showModelSearch}
                onClose={handleCloseModel}
            >
                <Modal.Header>
                    <div className='relative w-60 sm:w-96 md:w-[450px] '>
                        <AiOutlineSearch color='#9f9f9f' size='25px' className='absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer' />
                        <input
                            value={name}
                            onKeyDown={handleSetSearch}
                            onChange={(e: any) => setName(e.target.value)}
                            type="text" name='search' placeholder='Tìm khóa học' autoComplete='off' className='outline-none border-none focus:border-none focus:outline-none w-full 
                            bg-white rounded-lg py-1 pr-3 pl-10' />
                    </div>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>

            </Modal>
        </div>
    );
};

export default SearchModel;