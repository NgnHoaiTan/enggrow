import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
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
            setTimeout(() => {
                setLoadingFlashcard(false)
            }, 1000)

        }
        action()
    }, [folderId])
    if (loadingFlashcard) {
        return (
            <div>
                loading...
            </div>
        )
    }
    if (!flashcards || flashcards.length === 0) {
        return (
            <div>
                there is no card
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
                <Exercise exercise={exercise} flashcards={flashcards}/>

            </div>
        </div>
    );
};

export default PronunciationFlashcard;