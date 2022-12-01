import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import ListAlbum from '../components/album/ListAlbum';
import Toolbar from '../components/album/Toolbar';
import { getCurrentToken, getCurrentUser } from '../features/authentication/authSlice';
import { asyncGetMyFolders, asyncGetRemindPractice } from '../features/folder/folderApis';
import { getFolders, getRemindPractice } from '../features/folder/folderSlice';

const Album = () => {
    const [loadingFolders, setLoadingFolders] = useState(true)
    const dispatch = useDispatch<AppDispatch>()
    const folderCards = useAppSelector(getFolders)
    const user = useAppSelector(getCurrentUser)
    const accessToken = useAppSelector(getCurrentToken)
    const [search, setSearch] = useSearchParams();

    useEffect(() => {
        const action = async () => {
            setLoadingFolders(true)
            try {
                const dataSend = {
                    userId: user.id,
                    accessToken: accessToken,
                    query: {
                        filter: search.get('filter') || 'all'
                    }
                }
                const data = await dispatch(asyncGetMyFolders(dataSend))
                unwrapResult(data)
                setLoadingFolders(false)
            } catch (err) {
                setLoadingFolders(false)
                console.log(err)
            }

        }
        action()
    }, [search])

    if(loadingFolders) {
        return (
            <div>

            </div>
        )
    }
    else if(!folderCards) {
        return (
            <div>
                
            </div>
        )
    }
    return (
        <div className='mt-[70px] px-5 sm:px-10 lg:px-24 min-h-screen'>
            <h1 className='sm:text-lg text-base font-semibold mb-2 sm:mb-4'>Danh sách thư mục từ vựng</h1>
            <Toolbar />
            {
                !loadingFolders ?
                    <ListAlbum folderCards = {folderCards} />
                    :
                    <div></div>
            }


        </div>
    );
};

export default Album;