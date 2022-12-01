import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import ListCourse from '../components/courses/ListCourse';
import NewCourses from '../components/courses/NewCourses';
import Toptool from '../components/courses/Toptool';
import { getCurrentToken } from '../features/authentication/authSlice';
import { asyncGetAllPronunCourses, asyncGetNewPronunCourses } from '../features/pronunciation_course/pronunCourseAPIs';
import { getAllCourses, getNewCourses } from '../features/pronunciation_course/pronunCourseSlice';

const Courses = () => {
    const [loadingNewCourse, setLoadingNewCourse] = useState<boolean>(true)
    const [loadingAllCourse, setLoadingAllCourse] = useState<boolean>(true)
    const [search, setSearch] = useSearchParams();
    const dispatch = useDispatch<AppDispatch>()
    const allCourses = useSelector(getAllCourses)
    const newCourses = useSelector(getNewCourses)
    const accessToken = useAppSelector(getCurrentToken)
    useEffect(() => {
        const actionGetAll = async () => {
            try {
                setLoadingAllCourse(true)
                const dataSubmit = {
                    query: {
                        name: search.get('name'),
                        level: search.get('level')
                    },
                    accessToken:  accessToken
                }
                const getall = await dispatch(asyncGetAllPronunCourses(dataSubmit))
                unwrapResult(getall)

            } catch (error) {
                console.log(error)
            }

        }
        actionGetAll()
        setLoadingAllCourse(false)
    }, [search])

    useEffect(() => {
        const actionGetNew = async () => {
            try {
                setLoadingNewCourse(true)
                const getall = await dispatch(asyncGetNewPronunCourses(accessToken))
                unwrapResult(getall)

            } catch (error) {
                console.log(error)
            }
        }
        actionGetNew()
        setLoadingNewCourse(false)
    }, [])

    if (search.get('name')) {
        return (
            <div className="p-4">
                <div className=''>
                    <div className="top-tools mb-5">
                        <Toptool />
                    </div>
                    <div className="content-main">
                        <ListCourse title={'Kết quả tìm kiếm'} loadingAllCourse={loadingAllCourse} allCourses={allCourses} />
                    </div>

                </div>
            </div>
        )
    }

    return (
        <div className="p-4">
            <div className=''>
                <div className="top-tools mb-5">
                    <Toptool />
                </div>
                <div className="content-main">
                    <NewCourses loadingNewCourse={loadingNewCourse} newCourses={newCourses} />
                    <ListCourse title={'Tất cả khóa học'} loadingAllCourse={loadingAllCourse} allCourses={allCourses} />
                </div>

            </div>
        </div>

    );
};

export default Courses;