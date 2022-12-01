import dayjs from 'dayjs';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import { getListResults, refreshResults } from '../features/practice_flashcard/practiceFlashcardSlice';

const ResultPracticeCard = () => {
    const navigate = useNavigate()
    const resultPractice = useAppSelector(getListResults)
    const dispatch = useDispatch<AppDispatch>()
    const {folderId} = useParams()
    const handleMoveNext = async () => {
        try {
            dispatch(refreshResults())
            navigate(`/folders/flashcard/${folderId}`)
        } catch (error) {
            console.log(error)
        }
    }
    if (!resultPractice) {
        return (
            <div>
                <div className="top-nav-practice">
                    <div className="bg-white w-full h-14 drop-shadow-md">

                    </div>
                </div>
                <div className='bg-slate-100 p-3 md:py-10 w-full h-screen'>

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
            <div className='bg-slate-100 p-3 md:py-10 w-full min-h-screen max-h-fit'>
                <div className='rounded-xl shadow-md bg-white min-h-[500px] max-h-fit overflow-y-auto 
                    w-full md:w-[550px] lg:w-[600px] xl:w-[700px] mx-auto p-3'>
                    <div className="list-result-practice">
                        {
                            resultPractice.map((result: any, index: number) => {
                                return (
                                    <div
                                        key={result.id}
                                        className="result-item first:my-0 my-4 border-t-2 pt-2 first:border-t-0">
                                        <div className='flex flex-col gap-1'>
                                            <p className='font-bold text-lg'>Câu hỏi {index + 1}</p>
                                            <p>{dayjs(result.created_at).format('DD/MM/YYYY hh:mm:ss')}</p>
                                        </div>
                                        <div className='px-3'>
                                            <p className='text-center my-3 text-xl sm:text-2xl text-violet-500 font-bold'>
                                                {result.word}
                                            </p>
                                            <div className="right-answer my-2">
                                                <p className='font-bold my-2'>Đáp án đúng:</p>
                                                <div className='bg-green-500 text-white font-semibold rounded-md py-2 px-4'>
                                                    <p>{result.right_answer}</p>
                                                </div>

                                            </div>
                                            <div className="you-answer my-2">
                                                <p className='font-bold my-2'>Câu trả lời của bạn</p>
                                                <div className='bg-gray-100 text-[#3f3f3f] font-semibold rounded-md py-2 px-4'>
                                                    <p>{result.your_answer}</p>
                                                </div>

                                            </div>
                                            <div className="result flex items-center gap-5">
                                                <p className='font-bold my-2'>Kết quả</p>
                                                {result.result ?
                                                    <div className='bg-green-500 text-white font-bold rounded-lg py-1 px-4'>
                                                        <p>Chỉnh xác</p>
                                                    </div>
                                                    :
                                                    <div className='bg-red-500 text-white font-bold rounded-lg py-1 px-4'>
                                                        <p>Không chính xác</p>
                                                    </div>
                                                }

                                            </div>
                                        </div>


                                    </div>
                                )
                            })
                        }

                    </div>

                </div>

                <div className='flex justify-center mt-3'>
                    <button 
                    onClick={handleMoveNext}
                    className='text-white font-bold bg-violet-600 rounded-xl py-1 px-4'>
                        Continue
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ResultPracticeCard;