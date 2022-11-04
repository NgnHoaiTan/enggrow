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
    return (
        <div>
            <h1 className='font-bold text-xl mb-5'>New course</h1>
            <div className="list-new-course">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-8">
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