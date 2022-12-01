import React from 'react';
import { Link } from 'react-router-dom';
import CardCourse from './CardCourse';

interface course {
    id: number,
    name: string,
    description: string,
    poster: string,
    course_type: string,
    created_at: string,
    level: string
}
interface typeProps {
    loadingMyCourses: boolean,
    courses: course[] | null,
    title: string
}
const MyCourses = (props: typeProps) => {
    const { loadingMyCourses, courses, title } = props
    if (loadingMyCourses) {
        return (
            <div>

            </div>
        )
    }
    else if (!courses) {
        return (
            <div className='my-5'>
                <div className="my-2">
                    <h2 className='font-bold text-xl mb-5'>{title}</h2>
                </div>
                <div className='bg-white h-[150px] border-2 w-full sm:w-[300px] md:w-[400px] mx-auto border-[#e06325] rounded-xl p-5'>
                    <div>
                        <p className='font-semibold text-[#e06325] text-center text-lg'>Lỗi xảy ra trong quá trình tải dữ liệu khóa học, thử lại sau</p>
                    </div>
                </div>
            </div>
        )
    }
    else if (courses.length === 0) {
        return (
            <div className='my-5'>
                <div className="my-2">
                    <h2 className='font-bold text-xl mb-5'>{title}</h2>
                </div>
                <div className='bg-white min-h-[150px] border-2 w-full sm:w-[300px] md:w-[400px] mx-auto border-[#2172a0] rounded-xl p-5'>
                    <div>
                        <p className='font-semibold text-[#2172a0] text-center text-lg'>
                            Hiện danh sách khóa học được tạo bởi bạn đang trống. Bạn có muốn thêm khóa học không?
                        </p>
                        <div className="flex justify-center">
                            <button className='bg-[#2172a0] py-1 px-4 rounded-xl text-white font-semibold mt-3'>
                                <Link to={'/management/courses'}>
                                    Đến trang tạo khóa học
                                </Link>
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='my-5'>

            <div className="flex justify-between my-2">
                <h2 className='font-bold text-xl mb-5'>{title}</h2>
                <button className='underline mr-5 text-blue-500 font-semibold'>
                    <Link to={'/mycourses'}>
                        Xem thêm
                    </Link>

                </button>
            </div>
            <div className="grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-5">
                {
                    courses?.map((course: course, index: number) => {
                        if (index < 4) {
                            return (
                                <div
                                    key={course.id}
                                    className="grid-item">
                                    <CardCourse course={course} />
                                </div>
                            )
                        }
                        else return

                    })
                }

            </div>

        </div>
    );
};

export default MyCourses;