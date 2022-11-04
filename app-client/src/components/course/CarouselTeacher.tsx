import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import CardTeacher from './CardTeacher';
const CarouselTeacher = () => {
    return (
        <div className='bg-violet-500 px-14  sm:px-10 md:px-20 py-10'>
            <h2 className='font-bold text-white text-center my-2 text-2xl md:text-2xl lg:text-3xl'>Top best teacher</h2>
            <div className="carousel">
                <Swiper

                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    breakpoints={
                        {
                            1920: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 14,
                            },
                            480: {
                                slidesPerView: 1,
                                spaceBetween: 12,
                            },
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },

                        }
                    }
                >
                    <SwiperSlide>
                        <div className='p-1'>
                            <CardTeacher />
                        </div>

                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='p-1'>
                            <CardTeacher />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='p-1'>
                            <CardTeacher />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='p-1'>
                            <CardTeacher />
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </div>
    );
};

export default CarouselTeacher;