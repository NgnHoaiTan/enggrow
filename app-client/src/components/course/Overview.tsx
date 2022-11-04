import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsCalendarDate } from 'react-icons/bs';
import { SiGoogleclassroom } from 'react-icons/si';
import democourse from '../../images/democourse.jpg'
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';


interface typeProps {
    course: {
        id: number,
        name: string
        poster: string | null,
        description: string,
        level: string,
        episode: any[] | null
    }
}
const Overview = (props: typeProps) => {
    const { course } = props

    const createMarkup = (html: any) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    return (
        <div id="main-content-course" className=" my-2 lg:my-0 lg:mr-2 w-full lg:w-3/5">
            <div className="image-course w-full md:h-[400px] relative">
                <img src={course.poster || democourse} alt="course" className='w-full h-full object-cover rounded-xl' />
                <div className='absolute bottom-0 left-2 -translate-y-2 bg-white border-blue-300 border-2 py-1 px-4 rounded-xl w-fit'>
                    <p className='text-center'>
                        {course.level}
                    </p>
                </div>
            </div>
            <div className="info-course">
                <div className="name-and-desc">
                    <h3 className='font-semibold text-xl md:text-2xl xl:text-4xl my-3'>
                        {course.name}
                    </h3>
                    <div className="description text-base text-gray-500" dangerouslySetInnerHTML={createMarkup(course.description)}></div>
                </div>
            </div>
            <div className='flex justify-center cursor-pointer my-4 '>
                <button
                    className='rounded-lg px-4 py-3 bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] font-bold text-white '>
                    <Link to={`/courses/detail/${course.id}`}>
                        Start course
                    </Link>

                </button>
            </div>


        </div>
    );
};

export default Overview;