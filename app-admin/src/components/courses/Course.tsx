import React from 'react';
import { Link } from 'react-router-dom';
import { pictureRocket } from '../../common/Image';
import DOMPurify from 'dompurify';

interface courseProps {
    course: any
}
const Course = (props: courseProps) => {
    const { course } = props
    if (!course) {
        return null
    }
    const createMarkup = (html: any) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    return (
        <div className='bg-white shadow-card p-4 rounded-lg'>
            <div className='flex flex-col items-center'>
                <div className='bg-gradient-to-r flex items-center justify-center'>
                    <img src={pictureRocket} alt="rocket" className='object-cover w-16 h-16 rounded-full' />
                </div>
                <div className="name mt-1">
                    <p className='text-center font-bold text-lg lg:text-lg min-h-fit line-clamp-1 xl:line-clamp-2'>
                        {course.name}
                    </p>
                </div>
            </div>
            <div className='my-3 text-base text-center line-clamp-2 h-[50px]'>
                <div className="description" dangerouslySetInnerHTML={createMarkup(course.description)}></div>
                {/* <p className='text-base text-center line-clamp-2 h-[50px]'>

                </p> */}
            </div>
            <div className="btn flex items-center justify-center mt-2">
                <button className='px-3 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0]'>
                    <Link to={`${course.id}`}>
                        View Course
                    </Link>

                </button>
            </div>
        </div>
    );
};

export default Course;