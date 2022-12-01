import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import Course from './Course';

interface ListCourseProps {
    title: string,
    loadingAllCourse: boolean,
    allCourses: any[] | null
}

const ListCourse = (props: ListCourseProps) => {
    const { title, loadingAllCourse, allCourses } = props
    const [search, setSearch] = useSearchParams();
    const location = useLocation()
    const navigate = useNavigate()
    const handleSelectLevel = (e: any) => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams({
                level: e.target.value
            }).toString()
        });
    }
    if (loadingAllCourse) {
        return (
            <div>
                loading
            </div>
        )
    }
    else if (!allCourses) {
        return (
            <div>
                null
            </div>
        )
    }
    else if (allCourses.length === 0) {
        return (
            <div className="mt-10 w-full">
                {
                    search.get('level') === 'all' ?
                        <div>
                            <h1 className='font-bold text-xl my-5'>
                                {title}
                            </h1>
                            <div className="">
                                <div className='w-full mx-auto px-10 sm:w-[200px] sm:px-0 md:w-[400px] lg:w-[500px]'>
                                    <img
                                        className='w-full drop-shadow-md'
                                        src="https://res.cloudinary.com/hoaitan/image/upload/v1668606328/engrow/Search_concept_Yellow_Folder_and_magnifier_icons_hand_drawn_cartoon_art_illustration-removebg-preview_ydpu85.png" alt="notfound" />
                                </div>
                                <h2 className='font-bold text-lg sm:text-2xl text-center text-[#3f3f3f] mt-5'>Chưa có khóa học được tạo</h2>
                            </div>

                        </div>
                        :
                        <div>
                            <h1 className='font-bold text-xl my-5'>
                                {title}
                            </h1>
                            <div className='w-full  mx-auto px-10 sm:w-[200px] sm:px-0 md:w-[400px] lg:w-[500px]'>
                                <img
                                    className='w-full drop-shadow-md'
                                    src="https://res.cloudinary.com/hoaitan/image/upload/v1668606328/engrow/Search_concept_Yellow_Folder_and_magnifier_icons_hand_drawn_cartoon_art_illustration-removebg-preview_ydpu85.png" alt="notfound" />
                            </div>
                            <h2 className='font-bold text-lg sm:text-2xl text-center text-[#3f3f3f] mt-5'>Chưa có khóa học nào thuộc trình độ này</h2>
                        </div>

                }

            </div>

        )
    }
    return (
        <div className='mt-10'>
            <h1 className='font-bold text-xl my-5'>
                {title}
            </h1>
            <div className="mb-3 flex items-center gap-2">
                <select
                    onChange={handleSelectLevel}
                    value={search.get('level') || 'all'}
                    name="level" id="level" className='p-2 rounded-md border-2 border-gray-200'>
                    <option value="all">Mặc định</option>
                    <option value="beginner">Sơ cấp</option>
                    <option value="intermediate">Trung cấp</option>
                    <option value="upper intermediate">Trên trung cấp</option>
                    <option value="advanced">Nâng cao</option>
                </select>
            </div>
            <div className="list-all-course">
                <div className="grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-5">
                    {
                        allCourses.map((course: any) => {
                            return (
                                <div key={course.id}>
                                    <Course course={course} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>

    );
};

export default ListCourse;