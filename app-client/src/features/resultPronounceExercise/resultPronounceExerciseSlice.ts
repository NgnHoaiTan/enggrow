import { createSlice } from '@reduxjs/toolkit';
import { asyncGetHistoryAssessmentsByExercise } from './resultApis';

interface word_assessment {
    id: number,
    label: string,
    score: number,
    phone_assessment: any[]
}
interface assessment {
    id: number,
    score_gain: number,
    pronounce_url: string,
    word_assessment: word_assessment[]
}

interface initialState {
    results: assessment[] | null
}
const initialState = {
    results: null
}
const resultPronunciationSlice = createSlice({
    name:'result_pronunciation',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetHistoryAssessmentsByExercise.fulfilled,(state,action)=>{
                return {
                    ...state,
                    results: action.payload
                }
            })
    }

})

export const getResultPronunciationAssessment = (state: any) => state.result_pronunciation.results
export default resultPronunciationSlice.reducer;