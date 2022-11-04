import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useAppSelector } from '../../app/hooks';
import { getSearchList } from '../../features/folder/folderSlice';

const ResultSearchFolder = () => {
    const searchList = useAppSelector(getSearchList)
    return (
        <div>
            <div className='w-full'>
                <ul className='flex flex-col '>
                    {
                        searchList && 
                        searchList.map((item: any) => {
                            return (
                                <li className='w-full my-2' key={item.id}>
                                    <a href={`/folders/flashcard/${item.id}`} className='p-1 flex items-center w-full '>
                                        <IoIosSearch size="20px" className='mr-2' />
                                        {item.name}
                                    </a>

                                </li>
                            )
                        })
                    }


                </ul>
            </div>

        </div>

    );
};

export default ResultSearchFolder;