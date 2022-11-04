import React from 'react';
import { IoSearchSharp } from 'react-icons/io5';

const SearchExercise = () => {
    return (
        <div className='mb-8'>
            <div className='w-full md:w-3/5 mx-auto relative'>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer">
                    <IoSearchSharp size="25px" color="#929292"/>
                </div>

                <input type="text" name="name" id="name-exercise"
                    className='font-semibold w-full outline-none focus:outline-none border-none focus:border-none bg-gray-200 ring-gray-200 p-2 pr-10 md:pr-14 md:p-3 right-1  focus:ring-violet-500 rounded-lg'
                />
            </div>
        </div>
    );
};

export default SearchExercise;