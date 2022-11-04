import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, EffectFade } from "swiper";
import Card from './Card';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import Flashcard from './Flashcard';


function NextArrow(props: any) {
    const { onClick } = props;
    return (
        <div className='cursor-pointer absolute p-1 rounded-full top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-blue-500'
            onClick={onClick}>
            <MdOutlineNavigateNext color='white' size='30px' />
        </div>
    );
}
function PrevArrow(props: any) {
    const { onClick } = props;
    return (
        <div className='cursor-pointer absolute p-1 rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 bg-blue-500 z-10'
            onClick={onClick}>
            <MdOutlineNavigateBefore color='white' size='30px' />
        </div>
    );
}

const settings = {
    className: "center shadow-card rounded-xl",
    centerMode: false,
    infinite: true,
    dots: true,
    // fade: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
};
interface CarouselCardProps {
    flashcards: any
}

const CarouselCard = (props: CarouselCardProps) => {
    const { flashcards } = props
    return (
        <div className='rounded-xl'>
            <Slider {...settings}>
                {
                    flashcards.map((item: any, index: number) => {
                        return (
                            <div 
                            key={item.id}
                            className='p-5'>
                                <Flashcard card={item} total={flashcards.length} index={index}/>
                            </div>
                        )
                    })
                }

            </Slider>
            {/* <Swiper
                loop={true}
                pagination={{
                    dynamicBullets: true,
                }}
                slidesPerView={1}
                navigation={true}
                modules={[Pagination, EffectFade, Navigation]}
                className="flashcard-carousel rounded-xl"
            >

                <SwiperSlide>
                    <Card />
                </SwiperSlide>
                <SwiperSlide>
                    <Card />
                </SwiperSlide>
                <SwiperSlide>
                    <Card />
                </SwiperSlide>
                <SwiperSlide>
                    <Card />
                </SwiperSlide>
                <SwiperSlide>
                    <Card />
                </SwiperSlide>
                <SwiperSlide>
                    <Card />
                </SwiperSlide>


            </Swiper> */}
        </div>
    );
};

export default CarouselCard;