import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import Overview from '../components/course/Overview';
import { getCurrentToken } from '../features/authentication/authSlice';
import { asyncGetPronunCourseById } from '../features/pronunciation_course/pronunCourseAPIs';
import { getCourse } from '../features/pronunciation_course/pronunCourseSlice';

const OverviewCourse = () => {
    const [loadingCourse, setLoadingCourse] = useState(true)
    const {courseId} = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)
    const course = useAppSelector(getCourse)
    useEffect(()=>{
        const action = async()=>{
            try{
                setLoadingCourse(true)
                const dataGet = {
                    id: courseId,
                    accessToken:accessToken
                }
                await dispatch(asyncGetPronunCourseById(dataGet)).unwrap()
            }catch(error) {
                console.log(error)
            }
            
        }
        action()
        setLoadingCourse(false)
    },[courseId])
    if(loadingCourse) {
        return (
            <div>

            </div>
        )
    }
    if(!course) {
        return (
            <div>

            </div>
        )
    }
    
    return (
        <div className='detail-course bg-white w-full px-2 md:px-20 pt-16 sm:pt-16 lg:pt-20 pb-10'>
            <div className="flex justify-center">
                <Overview course={course}/>
            </div>
        </div>
    );
};

export default OverviewCourse;