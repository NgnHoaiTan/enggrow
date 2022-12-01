import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LearnedBarChart from './LearnedBarChart';
import ModelListCardLearned from './ModelListCardLearned';

interface cardlearned {
    id: number,
    score_gain: number,
    created_at: string,
    flashcard: {
        id: number,
        term: string,
        meaning: string,
        example: string
    }
}
interface typeProps {
    listCardLearned: cardlearned[] | null,
    error: string,
    loading: boolean,
    dueLearning: any[] | null
}
const StatisticWordLearned = (props: typeProps) => {
    const { listCardLearned, dueLearning, error, loading } = props
    const [showModelResult, setShowModelResult] = useState(false)
    const handleCloseModelResult = () => {
        setShowModelResult(false)
    }
    if (loading) {
        return (
            <div></div>
        )
    }
    else if (error || !listCardLearned) {
        return (
            <div>
                <p className='font-bold text-xl text-[#30ba6c]'>Từ vựng đã học hôm nay</p>
                <div className="statistic-part">

                </div>
            </div>
        )
    }
    return (
        <div>
            <p className='font-bold text-xl text-[#30ba6c]'>Từ vựng đã học hôm nay</p>
            <div className="statistic-part">
                {
                    listCardLearned.length > 0
                        ?
                        <div className='my-5'>
                            <p className='text-center font-bold text-lg md:text-xl'>
                                Tổng số {listCardLearned.length} đã học
                            </p>
                            <p className='text-center font-semibold text-lg'>Trong đó</p>
                            <div className='w-full sm:w-4/6 mx-auto mt-5'>
                                <LearnedBarChart 
                                    not_remember={listCardLearned.filter((card: cardlearned) => card.score_gain === 0).length}
                                    not_sure={listCardLearned.filter((card: cardlearned) => card.score_gain === 3).length}
                                    memorized={listCardLearned.filter((card: cardlearned) => card.score_gain === 5).length}
                                />
                            </div>
                            <div className='mt-5 flex justify-center'>
                                <button
                                    onClick={()=>setShowModelResult(true)}
                                    className='text-white bg-violet-600 rounded-xl py-1 px-3'
                                >
                                    Xem lịch sử
                                </button>
                                <ModelListCardLearned 
                                    results={listCardLearned}
                                    showModel={showModelResult}
                                    onClose={handleCloseModelResult}
                                />
                            </div>
                        </div>
                        :
                        <div>
                            {
                                dueLearning
                                    ?
                                    <div className='my-5'>
                                        <div className='w-full mx-auto sm:w-[400px] h-[150px] bg-[#ffffff] border-2 border-gray-100 rounded-xl drop-shadow-lg p-4'>
                                            <p className='text-center font-semibold text-violet-600'>
                                                Bạn chưa hoàn thành những từ vựng cần học hôm nay
                                            </p>
                                            <div className="flex justify-center mt-5">
                                                <button className='bg-[#d59c57] rounded-xl text-white font-bold text-center py-2 px-4 drop-shadow-sm'>
                                                    <Link to={'/folders'}>
                                                        Hoàn thành ngay
                                                    </Link>
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className='relative rounded-xl p-5 drop-shadow-lg bg-white  w-full sm:w-[400px] mx-auto'>
                                            <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 z-10'>
                                                <img src={`https://res.cloudinary.com/hoaitan/image/upload/v1668521449/engrow/rank1-removebg-preview_tyz58h.png`}
                                                    alt='ranking'
                                                    className={`w-20 drop-shadow-lg`}
                                                />
                                            </div>
                                            <div className='my-10'>
                                                <p className='text-violet-600 font-bold my-5 text-lg text-center'>Bạn không có từ vựng nào cần học hôm nay</p>
                                            </div>

                                        </div>
                                    </div>
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default StatisticWordLearned;