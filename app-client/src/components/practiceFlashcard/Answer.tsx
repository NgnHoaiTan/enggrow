import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { createSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getListResults, refreshResults, updateResults } from '../../features/practice_flashcard/practiceFlashcardSlice';

const Answer = (props: any) => {
    const { question, practiceCards, randomCards } = props
    const [active, setActive] = useState('')
    const [answer, setAnswer] = useState<string | null>(null)
    const [clickAnswer, setClickAnswer] = useState(false)
    const [submitAnswer, setSubmitAnswer] = useState(false)
    const [finishQuestion, setFinishQuestion] = useState(false)
    const { folderId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)
    const resultPractice = useAppSelector(getListResults)
    const notifyCorrect = (msg: string) => toast.success(msg)
    const notifyFalse = (msg: string) => toast.error(msg)

    const handleClickAnswer = (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
        if (!submitAnswer) {
            setActive(e.currentTarget.id)
            setClickAnswer(true)
            setAnswer(e.currentTarget.getAttribute('card-id'))
        }

    }
    useEffect(()=>{
        handleRefreshResult()
    },[])

    useEffect(() => {
        setActive(() => '')
        setSubmitAnswer(() => false)
        setAnswer(() => null)
        setFinishQuestion(false)
        setClickAnswer(false)
    }, [question])

    const handleRefreshResult = async() => {
        await dispatch(refreshResults())
    }

    const handleMoveNextQuestion = () => {
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
    }

    const handleSubmitAnswer = async () => {
        try {
            setClickAnswer(() => false)
            let result: boolean = (answer == practiceCards[question - 1].id)
            if (result) {
                notifyCorrect('You have a right choose')
            }
            else {
                notifyFalse('You false')
            }
            let falseCard = practiceCards.find((item: any) => item.id == answer)
            let dataResult = {
                id: practiceCards[question - 1].id,
                word: practiceCards[question - 1].term,
                your_answer: falseCard.meaning,
                right_answer: practiceCards[question - 1].meaning,
                created_at: new Date().toISOString(),
                result: result
            }
            if(!resultPractice) {
                let newListResult = new Array(0)
                newListResult.push(dataResult)
                await dispatch(updateResults(newListResult))
            }
            else {
                const existPractice = resultPractice.find((result: any) => result.id == dataResult.id) 

                if(!existPractice) {
                    let newListResult = [...resultPractice, dataResult]
                    await dispatch(updateResults(newListResult))
                }
            }

            setSubmitAnswer(true)
            setFinishQuestion(true)


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
                            className={`card-answer-item mt-3 first:mt-0 cursor-pointer bg-white rounded-xl p-5 
                                ${active === `answer-${index + 1}` ? 'bg-[#868dd4] text-white' : ''} ease-in-out duration-100
                            `}
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
                            Xác nhận
                        </button>
                        :
                        <React.Fragment>
                            {
                                (finishQuestion) ?
                                    <button
                                        onClick={handleMoveNextQuestion}
                                        className='bg-violet-500 text-white font-semibold px-2 py-3 cursor-pointer rounded-lg'>
                                        Tiếp tục
                                    </button>
                                    :
                                    <button
                                        disabled
                                        onClick={handleSubmitAnswer}
                                        className='bg-violet-300 text-white font-semibold px-2 py-3 cursor-pointer rounded-lg'>
                                        Xác nhận
                                    </button>

                            }

                        </React.Fragment>


                }

            </div>
            <ToastContainer
                position="top-right"
                autoClose={4000}
            />
        </div>
    );
};

export default Answer;