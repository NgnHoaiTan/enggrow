import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { createSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { asyncPracticeCard } from '../../features/flashcard/flashcardApis';

const Answer = (props: any) => {
    const { question, practiceCards, randomCards, valueTime, resetTime } = props
    const [active, setActive] = useState('')
    const [answer, setAnswer] = useState<string | null>(null)
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [resultAnswer, setResultAnswer] = useState<boolean | null>(null)
    const [clickAnswer, setClickAnswer] = useState(false)
    const [submitAnswer, setSubmitAnswer] = useState(false)

    const {folderId} = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)
    const handleClickAnswer = (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
        if(!submitAnswer) {
            setActive(e.currentTarget.id)
            setClickAnswer(true)
            setAnswer(e.currentTarget.getAttribute('card-id'))
        }
        
    }
    useEffect(() => {
        setActive(() => '')
        setCorrectAnswer(() => '')
        resetTime()
        setSubmitAnswer(() => false)
        setResultAnswer(() => null)
        setAnswer(() => null)
    }, [question])
    const handleSubmitAnswer = async () => {
        try {
            // submit answer to server and evaluate study

            // 5 - Hoàn hảo
            // 4 - Trả lời chính xác nhưng còn phải đắn đo
            // 3 - Trả lời chính xác nhưng gặp nhiều khó khăn
            // 2 - Trả lời không chính xác, đáp án đúng dễ dàng nhớ ra
            // 1 - Trả lời sai, nhớ được đáp án
            // 0 - Hoàn toàn không nhớ
            setClickAnswer(() => false)
            let grade: number
            let result: boolean = (answer == practiceCards[question - 1].id)
            if (!result) {
                setActive('')
                setCorrectAnswer(practiceCards[question - 1].id)
            }
            setResultAnswer(result)
            setSubmitAnswer(true)
            if (valueTime <= 10 && result) {
                grade = 5
            } else if (valueTime <= 20 && result) {
                grade = 4
            } else if (valueTime <= 50 && result) {
                grade = 3
            } else if (valueTime <= 60) {
                grade = 2
            }
            else {
                grade = 0
            }
            const dataSubmit = {
                id: answer,
                grade: grade,
                accessToken: accessToken
            }
            // const actionAPI = await dispatch(asyncPracticeCard(dataSubmit))
            // unwrapResult(actionAPI)
            // navigate to next answer
            setTimeout(() => {

                if (question < practiceCards.length) {
                    navigate({
                        pathname: location.pathname,
                        search: createSearchParams({
                            question: question + 1
                        }).toString()
                    });
                }
                else {
                    navigate(`/folders/flashcard/practice/finished/${folderId}`)
                }
            }, 2000)


        } catch (error) {
            console.log(error)
        }



    }
    return (
        <div className="card-answers mt-5">
            {
                randomCards.map((card: any, index: number) => {
                    return (
                        <div key={card.id}
                            card-id={`${card.id}`}
                            id={`answer-${index + 1}`}
                            onClick={(e) => handleClickAnswer(e)}
                            className={`${submitAnswer ? `${(!resultAnswer && answer == card.id) ? 'bg-red-500 text-white' : ''}` : ''} 
                            card-answer-item mt-3 first:mt-0 cursor-pointer bg-white rounded-xl p-5 
                            ${active === `answer-${index + 1}` ? 'bg-violet-400 text-white' : ''} ease-in-out duration-100`}
                        >
                            <p
                                id={`${card.id}`}
                                className='font-semibold  text-center'>
                                {card.meaning}
                            </p>
                        </div>
                    )
                })
            }


            <div className='mt-5 flex justify-end'>
                {
                    clickAnswer ?
                        <button
                            onClick={handleSubmitAnswer}

                            className='bg-violet-500 text-white font-semibold px-2 py-3 cursor-pointer rounded-lg'>
                            Submit answer
                        </button>
                        :
                        <button
                            disabled
                            onClick={handleSubmitAnswer}
                            className='bg-violet-300 text-white font-semibold px-2 py-3 cursor-pointer rounded-lg'>
                            Submit answer
                        </button>

                }

            </div>
        </div>
    );
};

export default Answer;