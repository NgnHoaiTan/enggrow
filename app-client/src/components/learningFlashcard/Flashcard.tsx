import React, { useState } from 'react';
import { RiVolumeUpLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { createSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { getCurrentToken, getCurrentUser } from '../../features/authentication/authSlice';
import { asyncSaveLearningHistory } from '../../features/card_learned/cardLearnedApi';
import { asyncLearningCard} from '../../features/flashcard/flashcardApis';

interface typeProps {
    card: {
        id: number,
        term: string,
        meaning: string,
        example: string
    },
    listCard: {
        id: number,
        term: string,
        meaning: string,
        example: string
    }[]
}
const Flashcard = (props: typeProps) => {
    const { card, listCard } = props
    const [face, setFace] = useState('front')
    const [errorLearning, setErrorLearning] = useState('')
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(window.location.search)
    const { folderId } = useParams()
    const question = parseInt(queryParams.get('question') as string) || 1
    const accessToken = useAppSelector(getCurrentToken)
    const user = useAppSelector(getCurrentUser)
    const dispatch = useDispatch<AppDispatch>()
    const speak = (message: string) => {
        var msg = new SpeechSynthesisUtterance(message)
        var voices = window.speechSynthesis.getVoices()
        msg.voice = voices[0]

        window.speechSynthesis.speak(msg)
    }
    const handleSubmitOption = async (grade: number) => {
        try {
            // 5 - Hoàn hảo
            // 4 - Trả lời chính xác nhưng còn phải đắn đo
            // 3 - Trả lời chính xác nhưng gặp nhiều khó khăn
            // 2 - Trả lời không chính xác, đáp án đúng dễ dàng nhớ ra
            // 1 - Trả lời sai, nhớ được đáp án
            // 0 - Hoàn toàn không nhớ
            setErrorLearning(() => '')
            let dataSubmit = {
                grade: grade,
                id: card.id,
                accessToken: accessToken
            }
            let dataHistory = {
                data: {
                    score_gain: grade,
                    flashcardId: card.id,
                    userId: user.id
                },
                accessToken: accessToken
            }
            await dispatch(asyncLearningCard(dataSubmit)).unwrap()
            await dispatch(asyncSaveLearningHistory(dataHistory)).unwrap()
            // navigate to next answer
            if (question < listCard.length) {
                navigate({
                    pathname: window.location.pathname,
                    search: createSearchParams({
                        question: (question + 1).toString()
                    }).toString()
                });
            }
            else {
                navigate(`/folders/flashcard/learning/finished/${folderId}`)
            }

        } catch (error: any) {
            if (error.message) {
                setErrorLearning(() => error.message)
            }
            else {
                setErrorLearning(() => 'Unknown error happen when submit your option')
            }
        }
    }
    if (!card) {
        return (
            <div className='h-[300px] drop-shadow-lg bg-white p-3'>
                <div className="h-[200px] flex items-center justify-center">
                    <div className="img-error">
                        <img src="https://res.cloudinary.com/hoaitan/image/upload/v1669043090/engrow/robot-404-error-errors-illustration-512x427-j192mt0z-removebg-preview_slclvw.png" alt="robot error"
                            className='w-20'
                        />
                    </div>
                    <p className='font-bold text-lg text-[#686868]'>Không tìm thấy thẻ</p>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center h-[600px] sm:h-[400px] bg-white rounded-md drop-shadow-lg'>
            {
                face === 'front' ?
                    <div className='flex justify-center mt-3'>
                        <button
                            onClick={() => setFace('back')}
                            className='bg-gray-100 drop-shadow-sm rounded-md py-1 px-3'>Mặt sau</button>
                    </div>
                    :
                    <div className='flex justify-center mt-3'>
                        <button
                            onClick={() => setFace('front')}
                            className='bg-gray-100 drop-shadow-sm rounded-md py-1 px-3'>Mặt trước</button>
                    </div>

            }
            {
                face === 'front' ?
                    <div className="h-2/3 flex flex-col  items-center justify-center w-full relative">
                        <p className='font-bold text-violet-600 text-3xl'>
                            {
                                card.term
                            }
                        </p>
                        <div
                            onClick={() => speak(card.term)}
                            className='mt-3 cursor-pointer'>
                            <RiVolumeUpLine color='white' size="30px" className='p-[5px] rounded-full bg-violet-500' />
                        </div>

                    </div>
                    :
                    <div className="meaning h-2/3 px-6 w-full flex flex-col items-center justify-center">
                        <p className='font-semibold text-lg text-center'>
                            {card.meaning}
                        </p>
                        <p className='example italic'>
                            {
                                card.example &&
                                <>
                                    Ví dụ:
                                    <span className='ml-1'>
                                        {
                                            card.example
                                        }
                                    </span>
                                </>

                            }


                        </p>
                    </div>
            }


            <div className="absolute bottom-0 -translate-y-3 sm:-translate-y-1/2">
                <div className="option flex flex-col sm:flex-row flex-wrap items-center gap-5 sm:justify-evenly">
                    <div className="not-remmember">
                        <button
                            onClick={() => handleSubmitOption(0)}
                            className='bg-red-500 hover:bg-red-600 text-white font-semibold py-[6px] px-3 rounded-lg'>
                            Not remember
                        </button>
                    </div>
                    <div className="not-sure">
                        <button
                            onClick={() => handleSubmitOption(3)}
                            className='bg-[#e3a03c] hover:bg-[#dd972d] text-white font-semibold py-[6px] px-3 rounded-lg'>
                            Not sure
                        </button>
                    </div>
                    <div className="memorized">
                        <button
                            onClick={() => handleSubmitOption(5)}
                            className='bg-green-500 hover:bg-[#1aa040] text-white font-semibold py-[6px] px-3 rounded-lg'>
                            Memorized
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Flashcard;