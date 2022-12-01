import {createSlice} from '@reduxjs/toolkit';
import { asyncGetAllPronunCourses, asyncGetAllMyPronunCourses,asyncGetReviewMyPronunCourses, asyncGetNewPronunCourses, asyncGetPronunCourseById, asyncGetTopInterestedPronunCourse, asyncGetLessInterestedPronunCourse, asyncStatisticTrendingLevel } from './pronunCourseAPIs';


interface course {
    id: number,
    name: string,
    description: string,
    level: string
}
interface courseState {
    new_courses: course[] | null
    all_courses: course[] | null,
    course: course | null,
    all_my_courses: course[] | null,
    review_my_courses: course[] | null,
    top_courses: course[] | null,
    worst_courses: course[] | null,
    trending_level: {
        id: any,
        pronunciation_course_level: string,
        participant_quantity: number
    } | null
}
const initialState: courseState = {
    new_courses: null,
    all_courses: null,
    course: null,
    all_my_courses: null,
    review_my_courses: null,
    top_courses: null,
    worst_courses: null,
    trending_level: null
}

const pronunCourseSlice = createSlice({
    name:'pronunciation_course',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetAllPronunCourses.fulfilled,(state, action)=>{
                return {
                    ...state,
                    all_courses: action.payload
                }
            })
            .addCase(asyncGetNewPronunCourses.fulfilled,(state, action)=>{
                return {
                    ...state,
                    new_courses: action.payload
                }
            })
            .addCase(asyncGetPronunCourseById.fulfilled,(state, action)=>{
                return {
                    ...state,
                    course: action.payload
                }
            })
            .addCase(asyncGetAllMyPronunCourses.fulfilled,(state,action) => {
                return {
                    ...state,
                    all_my_courses: action.payload
                }
            })
            .addCase(asyncGetReviewMyPronunCourses.fulfilled,(state,action) => {
                return {
                    ...state,
                    review_my_courses: action.payload
                }
            })
            .addCase(asyncGetTopInterestedPronunCourse.fulfilled,(state,action)=>{
                return {
                    ...state,
                    top_courses: action.payload
                }
            })
            .addCase(asyncGetLessInterestedPronunCourse.fulfilled,(state,action)=>{
                return {
                    ...state,
                    worst_courses: action.payload
                }
            })
            .addCase(asyncStatisticTrendingLevel.fulfilled,(state, action) => {
                return {
                    ...state,
                    trending_level: action.payload
                }
            })
    }
})

export const getStatisticTrendingLevel = (state: any) => state.pronunciation_course.trending_level
export const getTopCourses = (state:any) => state.pronunciation_course.top_courses
export const getWorstCourses = (state:any) => state.pronunciation_course.worst_courses
export const getReviewMyCourses = (state: any) => state.pronunciation_course.review_my_courses
export const getAllMyCourses = (state: any) => state.pronunciation_course.all_my_courses
export const getAllCourses = (state: any) => state.pronunciation_course.all_courses
export const getNewCourses = (state: any) => state.pronunciation_course.new_courses
export const getCourse = (state: any) => state.pronunciation_course.course
export default pronunCourseSlice.reducer;