import React from 'react';
import { Modal } from 'flowbite-react/lib/esm/components';
import { AiOutlineSearch } from 'react-icons/ai';

interface searchModelProps {
    showModelSearch: boolean,
    onClose: () => void
}
const SearchModel = (props: searchModelProps) => {

    return (
        <div>
            <Modal
                show={props.showModelSearch}
                onClose={props.onClose}
            >
                <Modal.Header>
                    <div className='relative w-60 sm:w-96 md:w-[450px] '>
                        <AiOutlineSearch color='#9f9f9f' size='25px' className='absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer' />
                        <input type="text" name='search' placeholder='Find course' autoComplete='off' className='outline-none border-none focus:border-none focus:outline-none w-full bg-white rounded-lg py-1 pr-3 pl-10' />
                    </div>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>

            </Modal>
        </div>
    );
};

export default SearchModel;