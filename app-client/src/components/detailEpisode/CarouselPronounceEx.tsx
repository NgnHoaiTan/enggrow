import React, { useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'

import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import ItemPronounceExercise from './ItemPronounceExercise';

interface pronunciation_exercise {
    id: number,
    phrase: string,
    meaning: string,
    episodeId: number
}
interface typeProps {
    exercises: pronunciation_exercise[] | null,
    loading: boolean
}

const ErrorDisplay = () => {
    return (
        <div className='w-[200px] sm:w-[300px] mx-auto mt-12 flex flex-col items-center'>
            <img
                className='w-full h-full object-cover drop-shadow-md'
                src="https://res.cloudinary.com/hoaitan/image/upload/v1667819281/engrow/2668387-removebg-preview_atiaci.png" alt="error display" />
            <p className='text-xl text-center font-bold text-[#3f3f3f]'>Error happened</p>
        </div>
    )
}

const CarouselPronounceEx = (props: typeProps) => {
    const { exercises, loading } = props
    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)
    if (loading) {
        return (
            <div>

            </div>
        )
    }
    else if (!exercises) {
        return (
            <ErrorDisplay />
        )
    }
    return (
        <div className='py-8'>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                pagination={{ clickable: false }}
                onSlideChange={() => console.log('we will reset state here')}
            >
                {
                    exercises.map((exercise: pronunciation_exercise) => {
                        return (
                            <SwiperSlide key={exercise.id}>
                                <ItemPronounceExercise exercise={exercise} />
                            </SwiperSlide>
                        )
                    })
                }


                <div className='flex'>
                    <div ref={navigationPrevRef} className='cursor-pointer absolute bottom-0 translate-x-1/2 left-0 -translate-y-1/2 z-50'>
                        <MdOutlineNavigateBefore size="35px" color='black' />
                    </div>
                    <div ref={navigationNextRef} className='cursor-pointer absolute bottom-0 -translate-x-1/2 right-0 -translate-y-1/2 z-50'>
                        <MdOutlineNavigateNext size="35px" color='black' />
                    </div>
                </div>

            </Swiper>

        </div>
    );
};

export default CarouselPronounceEx;