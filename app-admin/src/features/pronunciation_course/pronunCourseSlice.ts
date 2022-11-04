import {createSlice} from '@reduxjs/toolkit';
import { asyncGetAllPronunCourses, asyncGetNewPronunCourses, asyncGetPronunCourseById } from './pronunCourseAPIs';


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
}
const initialState: courseState = {
    new_courses: null,
    all_courses: null,
    course: null
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
    }
})
export const getAllCourses = (state: any) => state.pronunciation_course.all_courses
export const getNewCourses = (state: any) => state.pronunciation_course.new_courses
export const getCourse = (state: any) => state.pronunciation_course.course
export default pronunCourseSlice.reducer;