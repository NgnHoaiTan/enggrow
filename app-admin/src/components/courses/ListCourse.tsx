import React from 'react';
import Course from './Course';

interface ListCourseProps {
    loadingAllCourse: boolean,
    allCourses: any[] | null
}

const ListCourse = (props: any) => {
    const { title, loadingAllCourse, allCourses } = props
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
    return (
        <div className='mt-10'>
            <h1 className='font-bold text-xl my-5'>
                {title}
            </h1>
            <div className="list-all-course">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-8">
                    {
                        allCourses.map((course: any) => {
                            return (
                                <div key={course.id}>
                                    <Course course={course}/>
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