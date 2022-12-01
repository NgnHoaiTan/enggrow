import React, {useState} from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router';
import { createSearchParams } from 'react-router-dom';
import { FormSubmitEvent } from '../../events/events';

const SearchUser = () => {
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const handleSubmitSearch = async(e: FormSubmitEvent) => {
        e.preventDefault()
        navigate({
            pathname: '/management/users/search',
            search: createSearchParams({
                page: (1).toString(),
                name: name
            }).toString()
        });
    }
    return (
        <div className='w-full px-5 sm:px-0 my-5'>
            <div className='w-full sm:w-[300px] md:w-[500px] lg:w-[700px] mx-auto relative'>
                <div className="absolute left-0 translate-x-1/2 top-1/2 -translate-y-1/2">
                    <div>
                        <IoSearchOutline size={'22px'} color='#646464' />
                    </div>
                </div>
                <form className='relative' onSubmit={handleSubmitSearch}>
                    <input type="text" name='search' id='search'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className='rounded-xl py-2 pl-10 px-3 border-2 border-gray-300 w-full'
                    />
                    <button type='submit' className='absolute right-2 bg-gray-200 p-1 rounded-md top-1/2 -translate-y-1/2'>
                        Tìm kiếm
                    </button>

                </form>

            </div>
        </div>
    );
};

export default SearchUser;