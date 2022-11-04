import React from 'react';
import CardCourse from './CardCourse';
interface typeProps {
    courses: any[] | null,
    loadingCourses: boolean
}
const ListCourses = (props: typeProps) => {
    const { courses, loadingCourses } = props
    if (loadingCourses) {
        return (
            <div>
                loading
            </div>
        )
    }
    else if (!courses) {
        return (
            <div>
                courses null
            </div>
        )
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4 md:gap-7 lg:gap-8 px-2 md:px-0">
            {
                courses?.map((course: any) => {
                    return (
                        <React.Fragment key={course.id}>
                            <CardCourse course={course}/>
                        </React.Fragment>
                    )
                })
            }

        </div>
        // pagination
    );
};

export default ListCourses;