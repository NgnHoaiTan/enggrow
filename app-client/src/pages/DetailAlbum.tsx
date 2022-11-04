import React, { useEffect, useState } from 'react';
import CarouselCard from '../components/flashcard/CarouselCard';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import MiniCard from '../components/flashcard/MiniCard';
import AddModel from '../components/flashcard/AddModel';
import { TbEdit } from 'react-icons/tb';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { asyncGetFlashcardsByFolder } from '../features/flashcard/flashcardApis';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector } from '../app/hooks';
import { getCurrentToken } from '../features/authentication/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { getMyFlashcards } from '../features/flashcard/flashcardSlice';
import EditAlbum from '../components/album/EditAlbum';
import { getFolder } from '../features/folder/folderSlice';
import { asyncGetFolderById } from '../features/folder/folderApis';

const DetailAlbum = () => {
    const [showModelAdd, setShowModelAdd] = useState(false)
    const [showEditFolder, setShowEditFolder] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { folderId } = useParams()
    const accessToken = useAppSelector(getCurrentToken)
    const flashcards = useAppSelector(getMyFlashcards)
    const folder = useAppSelector(getFolder)
    const [loadingFlashcard, setLoadingFlashcard] = useState(true)
    const navigate = useNavigate()
    useEffect(()=>{
        const action = async()=>{
            const dataSubmit ={
                id: folderId,
                accessToken: accessToken
            }
            await dispatch(asyncGetFolderById(dataSubmit))
        }
        action()
    },[folderId])
    const handleCloseAdd = () => {
        setShowModelAdd(false)
    }
    const handleCloseEditFolder =() => {
        setShowEditFolder(false)
    }
    useEffect(() => {
        const action = async () => {
            setLoadingFlashcard(true)
            if (folderId) {
                try {
                    const dataParams = {
                        folderId: parseInt(folderId),
                        accessToken: accessToken
                    }
                    const callAPI = await dispatch(asyncGetFlashcardsByFolder(dataParams))
                    const result = unwrapResult(callAPI)
                } catch (error) {
                    console.log(error)
                }
            }
            setLoadingFlashcard(false)

        }
        action()
    }, [folderId])
    const data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'Your study progress',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }],

    };
    return (
        <div className='mt-[80px] px-5 sm:px-10 lg:px-24 min-h-screen'>
            <div className='flex flex-col justify-between items-center mb-10'>
                <h2 className='text-lg sm:text-xl xl:text-2xl font-bold mb-2'>
                    {folder.name}
                </h2>
                <div className='flex items-center'>
                    <div className="edit-info-folder mr-4 cursor-pointer">
                        <TbEdit 
                         onClick={()=>setShowEditFolder(true)}
                         size="100%" color='white' className='p-1 bg-violet-600 w-7 h-7 rounded-full' />
                    </div>
                    <div className="delete-folder cursor-pointer">
                        <MdDeleteForever size="100%" color='white' className='p-1 bg-violet-600 w-7 h-7 rounded-full' />
                    </div>
                </div>
            </div>

            <div className="flashcards">
                {
                    (!loadingFlashcard && flashcards) ?
                        <div className='w-full sm:w-[350px] xl:w-[380px] mx-auto mb-10'>
                            <CarouselCard flashcards={flashcards} />
                        </div>

                        :
                        <>
                        </>
                }

            </div>

            <div className="w-full xl:w-3/4 xl:mx-auto mt-3 group-btn grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5">
                <button 
                onClick={()=>navigate(`/folders/flashcard/practice/${folderId}`)}
                className='bg-[#5364d3] hover:-translate-y-[2px] ease-in-out font-semibold  duration-200 text-sm md:text-base rounded-sm md:rounded-lg py-2 sm:py-3 px-2 text-[#ffffff]'>
                    Practice
                </button>
                {/* <button className='bg-[#5364d3] hover:-translate-y-[2px] ease-in-out font-semibold duration-200 text-sm md:text-base rounded-sm md:rounded-lg py-2 sm:py-3 px-2 text-[#ffffff]'>
                    Ghép thẻ
                </button> */}
                <button 
                onClick={()=>navigate(`/folders/flashcard/pronunciation/${folderId}`)}
                className='bg-[#5364d3] hover:-translate-y-[2px] ease-in-out font-semibold duration-200 text-sm md:text-base rounded-sm md:rounded-lg py-2 sm:py-3 px-2 text-[#ffffff]'>
                    Pronunciation
                </button>
                <button onClick={() => setShowModelAdd(true)} className='bg-[#5364d3] hover:-translate-y-[2px] ease-in-out font-semibold duration-200 text-sm md:text-base rounded-sm md:rounded-lg py-2 sm:py-3 px-2 text-[#ffffff]'>
                    Add flashcard
                </button>
            </div>
            <EditAlbum show = {showEditFolder} onClose={handleCloseEditFolder} folder={folder}/>
            <AddModel showModelAdd={showModelAdd} onClose={handleCloseAdd} />
        </div>

    );
};

export default DetailAlbum;