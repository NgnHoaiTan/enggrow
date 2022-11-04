import { createSlice } from '@reduxjs/toolkit';
import { asyncGetAllExercisesByEpisode, asyncGetExerciseById } from './exerciseAPIs';
interface exercise {
    id: number,
    phrase: string,
    meaning: string,
    episodeId: number
}
interface exerciseState {
    exercises: exercise[] | null,
    exercise: exercise | null,
}
const initialState: exerciseState = {
    exercises: null,
    exercise: null
}
const exerciseSlice = createSlice({
    name:'exercise',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetAllExercisesByEpisode.fulfilled,(state, action)=>{
                return {
                    ...state,
                    exercises: action.payload
                }
            })
            .addCase(asyncGetExerciseById.fulfilled,(state, action)=>{
                return {
                    ...state,
                    exercise: action.payload
                }
            })
    }
})
export const getListExercises = (state: any) => state.exercise.exercises
export const getExercise = (state: any) => state.exercise.exercise
export default exerciseSlice.reducer;