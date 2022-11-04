import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch } from '../app/store';
import Background from '../components/course/Background';
import CarouselTeacher from '../components/course/CarouselTeacher';
import ListCourses from '../components/course/ListCourses';
import Option from '../components/course/Option';
import { asyncGetAllPronunCourses } from '../features/pronunciation_course/pronunCourseAPIs';
import { getAllCourses } from '../features/pronunciation_course/pronunCourseSlice';

const Course = () => {
    const [loadingCourses, setLoadingCourses] = useState(true)
    const [search, setSearch] = useSearchParams();
    const dispatch = useDispatch<AppDispatch>()
    const allCourses = useSelector(getAllCourses)
    useEffect(()=>{
        const actionGetAll = async () => {
            try {
                setLoadingCourses(true)
                const dataSubmit = {
                    query: {
                        name: search.get('name'),
                        level: search.get('level')
                    },
                    accessToken: 'accessToken'
                }
                await dispatch(asyncGetAllPronunCourses(dataSubmit)).unwrap()


            } catch (error) {
                console.log(error)
            }

        }
        actionGetAll()
        setLoadingCourses(false)
    },[search])
    return (
        <div className='w-full'>

            <Background />
            <div className='list-course bg-white w-full px-2 md:px-20 pt-5 sm:pt-24 lg:pt-28 pb-10'>
                <div className="mb-4 md:mb-8">
                    <Option />
                </div>
                <ListCourses courses={allCourses} loadingCourses={loadingCourses}/>

            </div>
            {/* top teacher */}
            <div className="top-teacher">
                <CarouselTeacher />
            </div>
        </div>
    );
};

export default Course;