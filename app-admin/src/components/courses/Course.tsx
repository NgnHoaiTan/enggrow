import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { pictureRocket } from '../../common/Image';
import DOMPurify from 'dompurify';
import dayjs from 'dayjs';
import EditCourse from './EditCourse';

interface courseProps {
    course: any
}
const Course = (props: courseProps) => {
    const { course } = props
    const [openEdit, setOpenEdit] = useState(false)
    if (!course) {
        return null
    }
    const createMarkup = (html: any) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    const handleCloseEdit =() => {
        setOpenEdit(false)
    }
    return (
        <div className="card rounded-xl overflow-hidden shadow-card hover:-translate-y-[1px] ease-in-out duration-300">
            <div className='card sm:mb-0 shadow-card rounded-2xl p-3 '>
                <div className="card-image relative">
                    <img src={`${course.poster}`}
                        alt="course" className='w-full h-[148px] object-cover rounded-xl' />
                    <div className='absolute bottom-0 left-2 -translate-y-2 bg-white py-1 px-4 rounded-xl w-fit'>
                        <p className='text-center'>
                            {
                                course.level
                            }
                        </p>
                    </div>
                </div>
                <div className="card-content mt-3 mb-5">
                    <div className="card-main-content">
                        <p className='created_at text-sm text-light'>
                            {dayjs(course.created_at).format('hh:mm:ss DD/MM/YYYY')}
                        </p>
                        <p className='font-semibold text-lg line-clamp-2 h-[55px] mb-2'>
                            {course.name}
                        </p>

                        <div className="description line-clamp-3 mb-3" dangerouslySetInnerHTML={createMarkup(course.description)}></div>
                    </div>

                </div>
                <div className="card-button flex justify-center">
                    <button
                        onClick={() => setOpenEdit(true)}
                        className='py-2 px-4 mr-3 font-bold text-center bg-[#d8d8d8] duration-150 rounded-xl'>
                        Cập nhật
                    </button>
                    <button className='py-2 px-4 font-bold text-center bg-blue-500 hover:bg-blue-600 duration-150 rounded-xl text-white'>
                        <Link to={`/management/courses/${course.id}`}>
                            Xem chi tiết
                        </Link>

                    </button>
                </div>
            </div>
            <EditCourse open={openEdit} onClose={handleCloseEdit} course={course} />
        </div>
    );
};

export default Course;