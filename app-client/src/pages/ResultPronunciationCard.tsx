import React from 'react';
import { useNavigate, useParams } from 'react-router';

const ResultPronunciationCard = () => {
    const navigate = useNavigate()
    const {folderId} = useParams()
    return (
        <div>
            <div className="top-nav-practice">
                <div className="bg-white w-full h-14 drop-shadow-md">

                </div>
            </div>
            <div className='bg-slate-100 p-3 md:py-10 w-full h-screen'>
                <div className='relative rounded-xl p-5 h-fit shadow-md bg-white  w-full md:w-[550px] lg:w-[600px] xl:w-[700px] mx-auto'>
                    <div className='flex flex-col items-center'>
                        <div className='px-10 sm:px-0 mt-5'>
                            <img src="https://res.cloudinary.com/hoaitan/image/upload/v1669127063/engrow/4529164-removebg-preview_b9awyq.png" alt="finish"
                                className='w-full sm:w-[250px] drop-shadow-md'
                            />
                        </div>
                        <p className='text-violet-600 font-bold my-5 text-lg'>Hoàn thành luyện tập</p>
                        <button
                            onClick={()=>navigate(`/folders/flashcard/${folderId}`)}
                            className='bg-white border-2 drop-shadow-md rounded-xl py-1 px-3 mb-3 font-semibold'
                        >
                            Tiếp tục
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ResultPronunciationCard;