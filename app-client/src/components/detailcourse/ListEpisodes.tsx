import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Itemslider from './Itemslider';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';

interface episode {
    id: number,
    name: string,
    description: string,
}
interface typeProps {
    episodes: episode[]
}

const ListEpisodes = (props: typeProps) => {
    const { episodes } = props
    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)
    return (
        <div className=''>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                speed={600}
                loop={true}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}

                pagination={{
                    dynamicBullets: true,
                }}
            >
                <div ref={navigationPrevRef} className='cursor-pointer absolute top-1/2 translate-x-1/2 left-0 -translate-y-1/2 z-50'>
                    <MdOutlineNavigateBefore size="35px" color='white' />
                </div>
                <div ref={navigationNextRef} className='cursor-pointer absolute top-1/2 -translate-x-1/2 right-0 -translate-y-1/2 z-50'>
                    <MdOutlineNavigateNext size="35px" color='white' />
                </div>
                {
                    episodes?.map((episode: episode) => {
                        return (
                            <SwiperSlide key={episode.id}>
                                <Itemslider episode={episode}/>
                            </SwiperSlide>
                        )
                    })
                }

            </Swiper>
        </div >
    );
};

export default ListEpisodes;