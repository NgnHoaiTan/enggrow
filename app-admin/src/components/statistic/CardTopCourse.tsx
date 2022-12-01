import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';


const icon1ndRank = 'https://res.cloudinary.com/hoaitan/image/upload/v1668521449/engrow/rank1-removebg-preview_tyz58h.png'
const icon2ndRank = 'https://res.cloudinary.com/hoaitan/image/upload/v1668521559/engrow/rank2-removebg-preview_vcmjxb.png'
const icon3ndRank = 'https://res.cloudinary.com/hoaitan/image/upload/v1668521671/engrow/rank3-removebg-preview_jvxptb.png'
interface typeProps {
    rank: number,
    course: any
}
const CardTopCourse = (props: typeProps) => {
    const { rank, course } = props
    return (
        <div className="card rounded-xl shadow-card hover:-translate-y-[1px] ease-in-out duration-300">
            <div className='card sm:mb-0 shadow-card rounded-2xl p-3 relative'>
                <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 z-10'>
                    <img src={`${rank === 1 ? `${icon1ndRank}` : `${rank === 2 ? `${icon2ndRank}` : `${icon3ndRank}`}`}`}
                        alt='ranking'
                        className={`${rank === 1 ? 'w-20' : 'w-[60px]'} drop-shadow-lg`}
                    />
                </div>
                <div className="card-image relative mt-[44px]">
                    <img src={`${course.poster}`}
                        alt="course" className='w-full h-[148px] object-cover rounded-xl' />
                    <div className='absolute bottom-0 left-2 -translate-y-2 bg-white py-1 px-4 rounded-xl w-fit'>
                        <p className='text-center'>
                            {course.level}
                        </p>
                    </div>
                </div>
                <div className="card-content mt-3 mb-5">
                    <div className="card-main-content">
                        <p className='created_at text-xs text-light'>
                            {dayjs(new Date()).format('DD/MM/YYYY hh:mm:ss')}
                        </p>
                        <p className={`font-semibold ${rank === 1 ? 'text-lg' : 'text-[17px]'} line-clamp-1
                         mb-2 `}>
                            {course.name}
                        </p>
                        <div className='list-participants flex items-center justify-center'>
                            {
                                course.members.map((member: any, index: number) => {
                                    if (index < 2) {
                                        return (
                                            <div className='mr-1' key={member.id}>
                                                <img src={member.participant.current_avatar} alt="" className='w-7 h-7 rounded-full object-cover' />
                                            </div>
                                        )
                                    }

                                    else if (index === 2) {
                                        return (
                                            <div
                                                key={member.id}
                                                className='w-6 h-6 rounded-full text-white bg-violet-600 flex justify-center items-center'>
                                                +{course.members.length - 2}
                                            </div>
                                        )
                                    }
                                    else if (index > 4) {
                                        return
                                    }
                                })
                            }
                        </div>
                    </div>

                </div>
                <div className="card-button flex justify-center">
                    <button className='py-2 px-4 font-bold text-center bg-blue-500 hover:bg-blue-600 duration-150 rounded-xl text-white'>
                        <Link to={`/management/courses/${course.id}`}>
                            Xem chi tiết
                        </Link>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default CardTopCourse;