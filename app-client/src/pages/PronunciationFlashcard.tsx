import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import Exercise from '../components/pronunciationCard/Exercise';
import { getCurrentToken } from '../features/authentication/authSlice';
import { asyncGetFlashcardsByFolder } from '../features/flashcard/flashcardApis';
import { getMyFlashcards } from '../features/flashcard/flashcardSlice';


const PronunciationFlashcard = () => {
    const { folderId } = useParams()
    const [loadingFlashcard, setLoadingFlashcard] = useState(true)
    const accessToken = useAppSelector(getCurrentToken)
    const dispatch = useDispatch<AppDispatch>()
    const flashcards = useAppSelector(getMyFlashcards)
    const queryParams = new URLSearchParams(window.location.search)
    const exercise = parseInt(queryParams.get('exercise') as string) || 1
    const navigate = useNavigate()


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
                    unwrapResult(callAPI)
                } catch (error) {
                    console.log(error)
                }
            }
            setLoadingFlashcard(() => false)

        }
        action()
    }, [folderId])
    if (loadingFlashcard) {
        return (
            <div>
            </div>
        )
    }
    if (!flashcards || flashcards.length === 0) {
        return (
            <div className='bg-slate-100 w-full h-screen p-3'>
                <div className='w-11/12 sm:w-[500px] md:w-[700px] left-1/2 -translate-x-1/2 absolute top-0 translate-y-5 sm:top-1/2 sm:-translate-y-1/2 drop-shadow-lg bg-white p-3 rounded-lg'>
                    <div className="h-[200px] flex flex-col items-center justify-center">
                        {
                            !flashcards ?
                                <p className='font-bold text-lg text-[#dc3d3d]'>
                                    Không tồn tại thẻ từ vựng
                                </p>
                                :
                                <p className='font-bold text-lg text-[#5845d1]'>
                                    Thư mục trống, không tìm thấy thẻ từ vựng
                                </p>
                        }

                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            className='px-5 py-2 bg-gray-200 text-black mr-3 cursor-pointer rounded-xl'
                        >
                            Trở về
                        </button>
                    </div>

                </div>
            </div>
        )
    }
    return (
        <div>
            <div className="top-nav-practice">
                <div className="bg-white w-full h-14 drop-shadow-md">

                </div>
            </div>
            <div className='bg-slate-100 p-3 md:py-10 w-full min-h-screen'>
                <Exercise exercise={exercise} flashcards={flashcards} />

            </div>
        </div>
    );
};

export default PronunciationFlashcard;