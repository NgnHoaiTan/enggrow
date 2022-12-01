import {createSlice} from '@reduxjs/toolkit';
import { asyncGetPronounceByCard, asyncGetTodayPronounceResultByUser } from './pronunciationCardResultApi';

interface temp_result {
    score_gain: number,
    created_at: string
}

interface initState {
    today_results: any[] | null,
    results_by_card: any[] | null,
    temp_results: temp_result[] | null
}
const initialState: initState = {
    today_results: null,
    results_by_card: null,
    temp_results: null,
}

const pronunciationCardResultSlice = createSlice({
    name:'pronunciation_card_result',
    initialState,
    reducers:{
        updateResults:(state, action)=>{
            state.temp_results = action.payload
        },
        refreshResults:(state)=>{
            state.temp_results = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetTodayPronounceResultByUser.fulfilled,(state, action)=>{
                return {
                    ...state,
                    today_results: action.payload
                }
            })
            .addCase(asyncGetPronounceByCard.fulfilled,(state, action)=>{
                return {
                    ...state,
                    results_by_card: action.payload
                }
            })
    }
})
export const {updateResults, refreshResults} = pronunciationCardResultSlice.actions
export const getTempPronunciationCardResults =(state: any) => state.pronunciation_card_result.temp_results
export const getTodayPronounceCardResults = (state: any) => state.pronunciation_card_result.today_results
export const getPronounceCardResultsByCard = (state: any) => state.pronunciation_card_result.results_by_card
export default pronunciationCardResultSlice.reducer;