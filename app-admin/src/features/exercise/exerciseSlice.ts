import { createSlice } from '@reduxjs/toolkit';
import { asyncGetAllPronunciationExercisesByEpisode, asyncGetPronunciationExerciseById,
    asyncGetAllIdentificationExercisesByEpisode, asyncGetIdentificationExerciseById
} from './exerciseAPIs';
interface pronunciation_exercise {
    id: number,
    phrase: string,
    meaning: string,
    episodeId: number
}
interface identification_exercise {
    id: number,
    true_word: string
    false_word: string,
    episodeId: number
}
interface exerciseState {
    pronunciation_exercises: pronunciation_exercise[] | null,
    identification_exercises: identification_exercise[] | null,
    identification_exercise: identification_exercise | null,
    pronunciation_exercise: pronunciation_exercise | null
}
const initialState: exerciseState = {
    pronunciation_exercises: null,
    pronunciation_exercise: null,
    identification_exercises: null,
    identification_exercise: null
}
const exerciseSlice = createSlice({
    name:'exercise',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetAllPronunciationExercisesByEpisode.fulfilled,(state, action)=>{
                return {
                    ...state,
                    pronunciation_exercises: action.payload
                }
            })
            .addCase(asyncGetPronunciationExerciseById.fulfilled,(state, action)=>{
                return {
                    ...state,
                    pronunciation_exercise: action.payload
                }
            })
            .addCase(asyncGetAllIdentificationExercisesByEpisode.fulfilled,(state,action)=>{
                return {
                    ...state,
                    identification_exercises: action.payload
                }
            })
            .addCase(asyncGetIdentificationExerciseById.fulfilled,(state,action)=>{
                return {
                    ...state,
                    identification_exercise: action.payload
                }
            })
    }
})
export const getListPronunciationExercises = (state: any) => state.exercise.pronunciation_exercises
export const getListIdentificatonExercises = (state: any) => state.exercise.identification_exercises

export default exerciseSlice.reducer;