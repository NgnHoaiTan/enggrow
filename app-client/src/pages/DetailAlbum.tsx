import React, { useEffect, useState } from 'react';
import CarouselCard from '../components/flashcard/CarouselCard';
import 'chart.js/auto';
import AddModel from '../components/flashcard/AddModel';
import { TbEdit } from 'react-icons/tb';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { asyncGetFlashcardsByFolder } from '../features/flashcard/flashcardApis';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector } from '../app/hooks';
import { getCurrentToken, getCurrentUser } from '../features/authentication/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { getMyFlashcards } from '../features/flashcard/flashcardSlice';
import EditAlbum from '../components/album/EditAlbum';
import { getFolder } from '../features/folder/folderSlice';
import { asyncDeleteFolder, asyncGetFolderById, asyncGetMyFolders } from '../features/folder/folderApis';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const DetailAlbum = () => {
    const [showModelAdd, setShowModelAdd] = useState(false)
    const [showEditFolder, setShowEditFolder] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { folderId } = useParams()
    const user = useAppSelector(getCurrentUser)
    const accessToken = useAppSelector(getCurrentToken)
    const flashcards = useAppSelector(getMyFlashcards)
    const folder = useAppSelector(getFolder)
    const [loadingFlashcard, setLoadingFlashcard] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const action = async () => {
            const dataSubmit = {
                id: folderId,
                accessToken: accessToken
            }
            await dispatch(asyncGetFolderById(dataSubmit))
        }
        action()
    }, [folderId])
    const handleCloseAdd = () => {
        setShowModelAdd(false)
    }
    const handleCloseEditFolder = () => {
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

    const handleConfirmDeleteFolder = () => {
        confirmAlert({

            title: 'Xác nhận xóa thư mục',
            message: 'Vui lòng xác nhận.',
            buttons: [
                {
                    label: 'Đồng ý',
                    onClick: () => handleDeleteFolder()
                },
                {
                    label: 'Không',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
    }
    const handleDeleteFolder = async () => {
        try {
            let dataDelete = {
                id: folderId,
                accessToken: accessToken
            }
            let dataGet = {
                userId: user.id,
                accessToken: accessToken
            }
            await dispatch(asyncDeleteFolder(dataDelete)).unwrap()
            await dispatch(asyncGetMyFolders(dataGet)).unwrap()
            navigate('/folders')
        } catch (error: any) {
            if (error.message) {
                alert(error.message)
            }
            else {
                alert('Lỗi không xác định')
            }
        }
    }

    if (!flashcards) {
        return (
            <div>

            </div>
        )
    }
    if (flashcards.length === 0) {
        return (
            <div className='mt-[80px] px-5 sm:px-10 lg:px-24 min-h-screen'>
                <div className="flex items-center gap-5">
                    <h2 className='text-lg sm:text-xl xl:text-2xl font-bold'>
                        {folder.name}
                    </h2>
                    <div className='flex items-center gap-4'>
                        <div className="edit-info-folder cursor-pointer">
                            <button
                                onClick={() => setShowEditFolder(true)}
                                className='flex items-center gap-2 text-white bg-green-500 rounded-xl py-1 px-3'>
                                Cập nhật thư mục
                                <TbEdit
                                    size="20px" color='white' className='' />
                            </button>

                        </div>
                        <div className="delete-folder cursor-pointer"
                        >
                            <button
                                onClick={handleConfirmDeleteFolder}
                                className='flex items-center gap-2 text-white bg-red-500 rounded-xl py-1 px-3'>
                                Xóa thư mục
                                <MdDeleteForever size="20px" color='white' />
                            </button>
                            
                        </div>
                    </div>
                </div>

                <div className="flex justify-center flex-col items-center">

                    <div className='w-full px-10 sm:w-[200px] sm:px-0 md:w-[400px] lg:w-[500px]'>
                        <img
                            className='w-full drop-shadow-md'
                            src="https://res.cloudinary.com/hoaitan/image/upload/v1668606328/engrow/Search_concept_Yellow_Folder_and_magnifier_icons_hand_drawn_cartoon_art_illustration-removebg-preview_ydpu85.png" alt="notfound" />
                    </div>
                    <h2 className='font-bold text-lg sm:text-xl text-center text-[#3f3f3f] mt-5'>Bạn chưa có thẻ từ vựng, thêm ngay ?</h2>
                    <div className="flex my-3 justify-center">
                        <button onClick={() => setShowModelAdd(true)} className='bg-[#5364d3] hover:-translate-y-[2px] ease-in-out font-semibold duration-200 text-sm md:text-base rounded-sm md:rounded-lg py-2 sm:py-3 px-2 text-[#ffffff]'>
                            Thêm thẻ từ vựng
                        </button>
                    </div>
                    <EditAlbum show={showEditFolder} onClose={handleCloseEditFolder} folder={folder} />
                    <AddModel showModelAdd={showModelAdd} onClose={handleCloseAdd} />
                </div>
            </div>

        )
    }
    return (
        <div className='mt-[80px] px-5 sm:px-10 lg:px-24 min-h-screen'>
            <div className='flex flex-col justify-between items-center mb-10'>
                <h2 className='text-lg sm:text-xl xl:text-2xl font-bold mb-4'>
                    {folder.name}
                </h2>
                <div className='flex items-center gap-4'>
                        <div className="edit-info-folder cursor-pointer">
                            <button
                                onClick={() => setShowEditFolder(true)}
                                className='flex items-center gap-2 text-white bg-green-500 rounded-xl py-1 px-3'>
                                Cập nhật thư mục
                                <TbEdit
                                    size="20px" color='white' className='' />
                            </button>

                        </div>
                        <div className="delete-folder cursor-pointer"
                        >
                            <button
                                onClick={handleConfirmDeleteFolder}
                                className='flex items-center gap-2 text-white bg-red-500 rounded-xl py-1 px-3'>
                                Xóa thư mục
                                <MdDeleteForever size="20px" color='white' />
                            </button>
                            
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

            <div className="w-full xl:w-3/4 xl:mx-auto mt-3 group-btn grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                <button
                    onClick={() => navigate(`/folders/flashcard/learning/${folderId}`)}
                    className='bg-[#5364d3] hover:-translate-y-[2px] ease-in-out font-semibold  duration-200 text-sm md:text-base rounded-sm md:rounded-lg py-2 sm:py-3 px-2 text-[#ffffff]'>
                    Học từ vựng
                </button>
                <button
                    onClick={() => navigate(`/folders/flashcard/practice/${folderId}`)}
                    className='bg-[#5364d3] hover:-translate-y-[2px] ease-in-out font-semibold duration-200 text-sm md:text-base rounded-sm md:rounded-lg py-2 sm:py-3 px-2 text-[#ffffff]'>
                    Ghép thẻ từ vựng
                </button>
                <button
                    onClick={() => navigate(`/folders/flashcard/pronunciation/${folderId}`)}
                    className='bg-[#5364d3] hover:-translate-y-[2px] ease-in-out font-semibold duration-200 text-sm md:text-base rounded-sm md:rounded-lg py-2 sm:py-3 px-2 text-[#ffffff]'>
                    Luyện tập phát âm
                </button>
                <button onClick={() => setShowModelAdd(true)} className='bg-[#5364d3] hover:-translate-y-[2px] ease-in-out font-semibold duration-200 text-sm md:text-base rounded-sm md:rounded-lg py-2 sm:py-3 px-2 text-[#ffffff]'>
                    Thêm thẻ từ vựng
                </button>
            </div>
            <EditAlbum show={showEditFolder} onClose={handleCloseEditFolder} folder={folder} />
            <AddModel showModelAdd={showModelAdd} onClose={handleCloseAdd} />
        </div>

    );
};

export default DetailAlbum;