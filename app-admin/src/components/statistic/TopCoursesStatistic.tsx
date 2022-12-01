import dayjs from 'dayjs';
import React from 'react';
import CardTopCourse from './CardTopCourse';

interface typeProps {
    loading: boolean,
    courses: any[],
    participants: any[] | null,
    recentRegister: any[] | null
}
const TopCoursesStatistic = (props: typeProps) => {
    const { loading, courses, participants, recentRegister } = props
    if (!courses) {
        return (
            <div>

            </div>
        )
    }
    return (
        <div>
            <h2 className='font-bold text-xl mb-10'>Những khóa học đang được quan tâm</h2>
            <div className="list-top-course">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
                    {
                        courses[1] &&
                        <div className="grid-item w-[280px]">
                            <CardTopCourse rank={2} course={courses[1]} />
                        </div>
                    }
                    {
                        courses[1] &&
                        <div className="grid-item w-[320px]">
                            <CardTopCourse rank={1} course={courses[0]} />
                        </div>
                    }
                    {
                        courses[1] &&
                        <div className="grid-item w-[280px]">
                            <CardTopCourse rank={3} course={courses[2]} />
                        </div>
                    }


                </div>

            </div>
            <div className="statistic-registered px-8 sm:px-0 flex justify-center my-6">
                <div className='bg-[#f95d6f] w-full sm:w-72 md:w-96 shadow-card drop-shadow-md rounded-xl p-3'>
                    <div className="flex flex-col items-center text-white">
                        <p className='font-semibold md:text-lg '>Tổng số lượng người dùng đăng ký</p>
                        <p className='font-bold text-xl sm:text-2xl lg:text-5xl my-2'>
                            {participants?.length}
                        </p>
                        <p className='sm:text-lg'>
                            Gồm {recentRegister?.length} lượt trong 7 ngày qua
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TopCoursesStatistic;