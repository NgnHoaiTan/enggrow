import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import EditCourse from './EditCourse';
interface typeProps {
    course: {
        id: number,
        name: string
        poster: string | null,
        description: string,
        created_at: string,
        level: string
    }
}
const CardCourse = (props: typeProps) => {
    const { course } = props
    const [openEdit, setOpenEdit] = useState(false)
    const navigate = useNavigate()
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
                            {dayjs(course.created_at).format('hh:mm DD/MM/YYYY')}
                        </p>
                        <p className='font-semibold text-lg line-clamp-1 mb-2'>
                            {course.name}
                        </p>

                        <div className="description line-clamp-3 mb-3" dangerouslySetInnerHTML={createMarkup(course.description)}></div>
                    </div>

                </div>
                <div className="card-button flex justify-center">
                    <button 
                    onClick={()=>setOpenEdit(true)}
                    className='py-2 px-4 mr-3 font-bold text-center bg-[#d8d8d8] duration-150 rounded-xl'>
                        Cập nhật
                    </button>
                    <button onClick={() => navigate(`/management/courses/${course.id}`)} className='py-2 px-4 font-bold text-center bg-blue-500 hover:bg-blue-600 duration-150 rounded-xl text-white'>
                        Xem chi tiết
                    </button>
                </div>
            </div>
            <EditCourse open={openEdit} onClose={handleCloseEdit} course={course}/>
        </div>
    );
};

export default CardCourse;