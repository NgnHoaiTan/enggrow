import { createSlice } from '@reduxjs/toolkit';
import { number } from 'yup';
import { asyncGetLearnedCardResultByUser, asyncGetTodayLearnedCardtByUser } from './cardLearnedApi';


interface initState {
    today_results: any[] | null,
    all_results: any[] | null,
    
}
const initialState: initState = {
    today_results: null,
    all_results: null
}

const cardLearnedSlice = createSlice({
    name:'card_learned',
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetLearnedCardResultByUser.fulfilled,(state, action)=>{
                return {
                    ...state,
                    all_results: action.payload
                }
            })
            .addCase(asyncGetTodayLearnedCardtByUser.fulfilled,(state, action)=>{
                return {
                    ...state,
                    today_results: action.payload
                }
            })
    }
})

export const getAllCardLearned = (state: any) => state.card_learned.all_results
export const getTodayCardLearned = (state: any) => state.card_learned.today_results
export default cardLearnedSlice.reducer;