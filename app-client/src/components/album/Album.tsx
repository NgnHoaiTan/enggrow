import React, { useEffect, useState } from 'react';
import { BiUpload } from 'react-icons/bi';
import { useNavigate, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import { useAppSelector } from '../../app/hooks';
import { getDueFolder, getRemindPractice } from '../../features/folder/folderSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { asyncGetDuefolder } from '../../features/folder/folderApis';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';


const Album = (props: any) => {
    const [openDelete, setOpenDelete] = useState(false)
    const folderId = props.folder.folder_flashcard_id
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)
    const dueFolders = useAppSelector(getDueFolder)
    useEffect(() => {
        const action = async () => {
            try {
                const callAPI = await dispatch(asyncGetDuefolder(accessToken))
                unwrapResult(callAPI)
            } catch (error) {
                console.log(error)
            }

        }
        action()
    }, [folderId])
    return (
        <div className='bg-white relative shadow-card rounded-lg cursor-pointer md:hover:scale-[1.02] scale-100 transition-all ease-in-out duration-300'>
            <div onClick={() => navigate(`/folders/flashcard/${props.folder.folder_flashcard_id}`)} className='p-2 md:p-4'>
                <p className='text-[#393939] font-semibold text-base md:text-lg my-5'>{props.folder.folder_flashcard_name}</p>
                <div className='my-2 flex items-center justify-between'>
                    <div className='flex items-center'>
                        <img className='w-5 h-5 md:w-7 md:h-7 rounded-full object-cover mr-1' src={`${props.folder.user_current_avatar}`} alt='avatar teacher' />
                        <p className='hidden sm:block'>{props.folder.user_name}</p>
                    </div>
                    <div className="flex items-center">
                        <p className='text-xs sm:text-sm text-gray-400 mr-1'>{dayjs(props.folder.folder_flashcard_created_at).format('DD/MM/YYYY')}</p>
                        <div className='w-4 md:w-5'>
                            <BiUpload size="100%" color="#b6b6b6" />
                        </div>
                    </div>


                </div>
            </div>
            {
                dueFolders ?
                    <div className="absolute z-50 right-0 top-0 -translate-x-1/2 translate-y-1/2">
                        {
                            dueFolders.filter((item: any) => item.id === props.folder.folder_flashcard_id)
                                .map((folder: any) => {
                                    return (
                                        <div key={folder.id}
                                            className='bg-gray-100  w-7 h-7 rounded-full flex items-center justify-center'

                                        >
                                            <p className='font-bold text-red-500'>
                                                {folder.flashcard.length}
                                            </p>

                                        </div>
                                    )
                                })
                        }
                    </div>
                    :
                    <div></div>
            }


        </div>
    );
};

export default Album;