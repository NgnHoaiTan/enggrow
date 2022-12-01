import { createSlice } from '@reduxjs/toolkit';

interface practiceResult {
    id: string,
    word: string,
    your_answer: string,
    right_answer: string,
    created_at: string,
    result: boolean
}
interface initialState {
    practiceResults: practiceResult[] | null
}
const initialState: initialState = {
    practiceResults: null
}

const practiceFlashcardSlide = createSlice({
    name: 'practice_flashcard',
    initialState,
    reducers: {
        updateResults:(state, action)=>{
            state.practiceResults = action.payload
        },
        refreshResults:(state)=>{
            state.practiceResults = null
        }
    },
})

export const getListResults = (state: any) => state.practice_flashcard.practiceResults
export const {updateResults, refreshResults} = practiceFlashcardSlide.actions
export default practiceFlashcardSlide.reducer

