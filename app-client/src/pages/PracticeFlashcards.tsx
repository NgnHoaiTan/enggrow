import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import Answer from '../components/practiceFlashcard/Answer';
import Question from '../components/practiceFlashcard/Question';
import { getCurrentToken } from '../features/authentication/authSlice';
import { asyncGetFlashcardsByFolder } from '../features/flashcard/flashcardApis';
import { getMyFlashcards, getPracticeCards } from '../features/flashcard/flashcardSlice';
import { CountUp, useCountUp } from 'use-count-up'
import practiceImg from '../images/practice.png'
interface randomCard {
    id: number,
    term: string,
    meaning: string,
    example: string,
    type: number,
    folderFlashcardId: number
}

const PracticeFlashcards = () => {
    const [loadingCards, setLoadingCards] = useState(true)
    const [randomCards, setRandomCards] = useState<randomCard[]>()
    const [introduce, setIntroduce] = useState(true)
    const { folderId } = useParams()
    const queryParams = new URLSearchParams(window.location.search)
    const question = parseInt(queryParams.get('question') as string) || 1
    const dispatch = useDispatch<AppDispatch>()
    const allFlashcard = useAppSelector(getMyFlashcards)
    const accessToken = useAppSelector(getCurrentToken)
    const navigate = useNavigate()

    useEffect(() => {
        const action = async () => {
            setLoadingCards(true)
            try {

                if (folderId) {
                    const data = {
                        folderId: folderId,
                        accessToken: accessToken
                    }
                    await dispatch(asyncGetFlashcardsByFolder(data))
                }

            } catch (error) {
                console.log(error)
            }
        }
        action()
        setLoadingCards(false)
    }, [folderId])



    useEffect(() => {
        const getRandomCard = () => {
            if (allFlashcard && allFlashcard.length > 0) {
                let listResult = new Array(0)
                let otherCards = allFlashcard.filter((item: any) => item.id !== allFlashcard[question - 1].id)
                let i = 0;
                if (otherCards.length <= 3) {
                    listResult = [...otherCards]
                    listResult = [allFlashcard[question - 1], ...listResult]
                }
                else if (otherCards.length >= 4) {
                    while (i < 2) {
                        const randomItem = otherCards[Math.floor(Math.random() * allFlashcard.length)]
                        
                        if (randomItem && !listResult.includes(randomItem)) {
                            listResult.push(randomItem)
                            i++
                        }
                    }
                    listResult.push(allFlashcard[question - 1])
                }

                shuffleArray(listResult)
                setRandomCards(listResult)
            }
        }
        getRandomCard()
    }, [question])
    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }


    if (loadingCards) {
        return (
            <div>
                loading
            </div>
        )
    }
    else if (!allFlashcard) {
        return (
            <div>
                Không có thẻ từ vựng
            </div>
        )
    }
    else if (allFlashcard.length === 0) {
        return (
            <div>
                Không có thẻ từ vựng
            </div>
        )
    }
    return (
        <div>
            <div className="top-nav-practice">
                <div className="bg-white w-full h-14 drop-shadow-md">

                </div>
            </div>
            <div className='bg-slate-100 p-3 md:py-10 w-full h-screen'>
                {
                    introduce ?
                        <div className='rounded-xl shadow-md bg-white h-[300px] sm:h-fit w-full md:w-[550px] lg:w-[600px] xl:w-[700px] mx-auto'>
                            <div className='w-full'>
                                <img src={practiceImg} className='w-full' />
                                <ul className='flex flex-col items-center justify-center'>
                                    <li>
                                        1. Xem kỹ từ vựng
                                    </li>
                                    <li>
                                        2. Chọn phương án tốt nhất
                                    </li>
                                </ul>
                            </div>
                            <div className="flex items-center justify-center mt-5 pb-5">
                                <button
                                    onClick={() => navigate(-1)}
                                    className='px-5 py-2 bg-gray-200 text-black mr-3 cursor-pointer rounded-xl'>
                                    Trở về
                                </button>
                                <button onClick={() => setIntroduce(false)}
                                    className='px-3 py-2 bg-violet-500 text-white cursor-pointer rounded-xl'
                                >
                                    Bắt đầu
                                </button>
                            </div>

                        </div>
                        :
                        <div className='w-full md:w-[550px] lg:w-[600px] xl:w-[700px] mx-auto'>
                            <Question
                                question={question}
                                practiceCards={allFlashcard} />

                            <Answer
                                question={question}
                                practiceCards={allFlashcard}
                                randomCards={randomCards} />
                        </div>
                }

            </div>
        </div>

    );
};

export default PracticeFlashcards;