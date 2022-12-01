import React from 'react';
import { Link } from 'react-router-dom';
import Course from './Course';

interface ListNewCoursesProps {
    loadingNewCourse: boolean,
    newCourses: any[] | null
}

const NewCourses = (props: ListNewCoursesProps) => {
    const { loadingNewCourse, newCourses } = props
    if (loadingNewCourse) {
        return (
            <div>
                loading
            </div>
        )
    }
    else if (!newCourses) {
        return (
            <div>
                null
            </div>
        )
    }
    else if(newCourses.length === 0) {
        return (
            <div>
                
            </div>
        )
    }
    return (
        <div>
            <h1 className='font-bold text-xl mb-5'>Những khóa học mới nhất</h1>
            <div className="list-new-course">
                <div className="grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-5">
                {
                        newCourses.map((course: any) => {
                            return (
                                <div key={course.id}>
                                    <Course course={course}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    );
};

export default NewCourses;