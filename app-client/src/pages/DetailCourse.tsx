import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import ListEpisodes from '../components/detailcourse/ListEpisodes';
import { getCurrentToken } from '../features/authentication/authSlice';
import { asyncGetPronunCourseById } from '../features/pronunciation_course/pronunCourseAPIs';
import { getCourse } from '../features/pronunciation_course/pronunCourseSlice';

const DetailCourse = () => {
    const [loadingCourse, setLoadingCourse] = useState(true)
    const { courseId } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)
    const course = useAppSelector(getCourse)
    useEffect(() => {
        const action = async () => {
            try {
                setLoadingCourse(true)
                const dataGet = {
                    id: courseId,
                    accessToken: accessToken
                }
                await dispatch(asyncGetPronunCourseById(dataGet)).unwrap()
            } catch (error) {
                console.log(error)
            }

        }
        action()
        setLoadingCourse(false)
    }, [courseId])
    if (loadingCourse) {
        return (
            <div>

            </div>
        )
    }
    if (!course) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className='detail-course bg-space-1 object-cover bg-center bg-cover w-full h-screen overflow-y-scroll'>
            {
                course.episode ?
                    <ListEpisodes episodes={course.episode} />
                    :
                    <div>

                    </div>
            }

        </div>
    );
};

export default DetailCourse;