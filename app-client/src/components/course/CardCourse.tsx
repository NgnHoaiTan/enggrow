import { useNavigate } from 'react-router';
import democourse from '../../images/democourse.jpg'
import DOMPurify from 'dompurify';

interface typeProps {
    course: {
        id: number,
        name: string
        poster: string | null,
        description: string,
        level: string
    }
}
const CardCourse = (props: typeProps) => {
    const {course} = props
    const navigate = useNavigate()

    const createMarkup = (html: any) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    return (
        <div className='card mb-4 sm:mb-0 shadow-card rounded-2xl p-3 hover:-translate-y-1 ease-in-out duration-300'>
            <div className="card-image relative">
                <img src={course.poster || democourse} alt="course" className='w-full  h-[148px] object-cover rounded-2xl' />
                <div className='absolute bottom-0 left-2 -translate-y-2 bg-white py-1 px-4 rounded-xl w-fit'>
                    <p className='text-center'>
                        {course.level}
                    </p>
                </div>
            </div>
            <div className="card-content mt-3 mb-5">
                <div className="card-main-content">
                    <p className='font-semibold text-lg line-clamp-2 mb-2 h-[56px]'>
                        {course.name}
                    </p>
                    <div className="description line-clamp-3 mb-3" dangerouslySetInnerHTML={createMarkup(course.description)}></div>
                </div>

            </div>
            <div className="card-button">
                <button onClick={()=>navigate(`/courses/overview/${course.id}`)} className='w-full py-3 font-bold text-center bg-blue-500 hover:bg-blue-600 duration-150 rounded-xl text-white'>
                    Xem chi tiết
                    </button>
            </div>
        </div>
    );
};

export default CardCourse;