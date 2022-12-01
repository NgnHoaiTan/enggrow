import React, {useState, useRef} from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { InputEvent } from '../../events/events';

interface searchEpisodeProps {
    onSubmit:(arg:any)=>void,
    setStopSearch: (value: boolean | null)=>void
}
const SearchEpisode = (props: searchEpisodeProps) => {
    const {onSubmit, setStopSearch} = props
    const [dataSearch, setDataSearch] = useState('')
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const handleChangeInput = (e: InputEvent) => {
        setDataSearch(e.target.value)
        const valueSearch = {
            ['name']: e.target.value
        }
        if(!onSubmit) return
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
        if(valueSearch.name.length >=3) {
            typingTimeoutRef.current = setTimeout(()=>{
                onSubmit(valueSearch)
            },1200)
        }
        else if(e.target.value === '') {
            setStopSearch(true)
        }
    }
    return (
        <div className='mb-8'>
            <div className='w-full md:w-3/5 mx-auto relative'>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer">
                    <IoSearchSharp size="25px" color="#929292"/>
                </div>

                <input 
                    onChange={handleChangeInput}
                    type="text" name="name" id="name-exercise"
                    placeholder='nhập tên bài học'
                    className='font-semibold w-full outline-none focus:outline-none border-none focus:border-none bg-gray-200 ring-gray-200 p-2 pr-10 md:pr-14 md:p-3 right-1  focus:ring-violet-500 rounded-lg'
                />
            </div>
        </div>
    );
};

export default SearchEpisode;