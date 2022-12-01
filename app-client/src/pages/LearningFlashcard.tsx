import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import { greatJob } from '../common/Image';
import Flashcard from '../components/learningFlashcard/Flashcard';
import { getCurrentToken } from '../features/authentication/authSlice';
import { asyncGetFlashcardsByFolder, asyncGetLearningCardsByFolder } from '../features/flashcard/flashcardApis';
import { getPracticeCards } from '../features/flashcard/flashcardSlice';
import practiceImg from '../images/practice.png'

const LearningFlashcard = () => {
    const [loadingCards, setLoadingCards] = useState(true)
    const [introduce, setIntroduce] = useState(true)
    const { folderId } = useParams()
    const queryParams = new URLSearchParams(window.location.search)
    const question = parseInt(queryParams.get('question') as string) || 1
    const dispatch = useDispatch<AppDispatch>()
    const practiceCards = useAppSelector(getPracticeCards)
    const accessToken = useAppSelector(getCurrentToken)
    const navigate = useNavigate()

    useEffect(() => {
        const action = async () => {
            setLoadingCards(() => true)
            try {

                if (folderId) {
                    const data = {
                        folderId: folderId,
                        accessToken: accessToken
                    }
                    await dispatch(asyncGetLearningCardsByFolder(data))
                    await dispatch(asyncGetFlashcardsByFolder(data))
                }

            } catch (error) {
                console.log(error)
            }
        }
        action()
        setLoadingCards(() => false)
    }, [folderId])

    if (loadingCards) {
        return (
            <div>
                loading
            </div>
        )
    }
    else if (!practiceCards) {
        return (
            <div className='mt-10'>
                <p className='text-red-500 font-bold text-center'>Lỗi không xác định, thử lại sau</p>
            </div>
        )
    }
    else if (practiceCards.length === 0) {
        return (
            <div className='bg-slate-100 w-full h-screen p-3'>
                <div className='w-11/12 sm:w-[500px] md:w-[700px] left-1/2 -translate-x-1/2 absolute top-0 translate-y-5 sm:top-1/2 sm:-translate-y-1/2 drop-shadow-lg bg-white p-3 rounded-lg'>
                    <div className="h-[250px] flex flex-col items-center justify-center">
                        <div className="img-error">
                            <img src={greatJob} alt="robot error"
                                className='w-32'
                            />
                        </div>
                        <p className='font-bold text-lg text-[#686868]'>
                            Bạn đã hoàn thành thư mục từ vựng này
                        </p>
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
    else if (!practiceCards || question > practiceCards.length || !practiceCards[question - 1]) {
        return (
            <div className='bg-slate-100 w-full h-screen p-3'>
                <div className='w-full sm:w-[500px] mx-auto drop-shadow-lg bg-white p-3'>
                    <div className="h-[200px] flex items-center justify-center">
                        <div className="img-error">
                            <img src="https://res.cloudinary.com/hoaitan/image/upload/v1669043090/engrow/robot-404-error-errors-illustration-512x427-j192mt0z-removebg-preview_slclvw.png" alt="robot error"
                                className='w-36'
                            />
                        </div>
                        <p className='font-bold text-lg text-[#686868]'>Không tìm thấy trang</p>
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
            <div className='bg-slate-100 p-3 md:py-10 w-full h-screen'>
                {
                    introduce ?
                        <div className='rounded-xl shadow-md bg-white h-[300px] sm:h-fit w-full md:w-[550px] lg:w-[600px] xl:w-[700px] mx-auto'>
                            <div className='w-full'>
                                <img src={practiceImg} className='w-full' />
                                <ul className='flex flex-col items-center justify-center px-5 text-center'>
                                    <li>
                                        1. Học từ và kiểm tra khả năng ghi nhớ về từ
                                    </li>
                                    <li>
                                        2. Chọn phương án phù hợp nhất với bạn: đã thuộc - chưa chắc chắn - chưa thuộc
                                    </li>
                                    <li>
                                        3. Hệ thống sẽ phân tích và tính toán thời gian học cho bạn giúp nhanh chóng ghi nhớ hơn
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
                                    Bắt đầu học
                                </button>
                            </div>

                        </div>
                        :
                        <div className='w-full md:w-[400px] lg:w-[500px] mx-auto'>
                            <Flashcard card={practiceCards[question - 1]} listCard={practiceCards} />
                        </div>
                }

            </div>
        </div>
    );
};

export default LearningFlashcard;