import { createSlice } from '@reduxjs/toolkit';
import { asyncCreateFlashcard, asyncGetFlashcardsByFolder, asyncGetLearningCardsByFolder, asyncCheckHaveDueCard } from './flashcardApis';


interface flashcard{
    id: number,
    term: string,
    meaning: string,
    example: string,
    folderFlashcardId: number,
    type: number,
    dueDate: string,
    interval: number,
    repetition: number,
    efactor: number,
}
interface flashcardState {
    myFlashcards: flashcard[] | null,
    practices:flashcard[] | null,
}

const initialState: flashcardState = {
    myFlashcards: null,
    practices: null
};

const flashcardSlide = createSlice({
    name: 'flashcard',
    initialState,
    reducers: {
        resetPractices:(state)=>{
            state.practices = new Array(0)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncCreateFlashcard.fulfilled, (state, { payload }) => {
                console.log(payload)
            })
            .addCase(asyncGetFlashcardsByFolder.fulfilled, (state,action)=>{
                return {
                    ...state,
                    myFlashcards: action.payload
                }
            })
            .addCase(asyncGetLearningCardsByFolder.fulfilled, (state,action)=>{
                return {
                    ...state,
                    practices: action.payload
                }

            })
            .addCase(asyncGetLearningCardsByFolder.rejected, (state,action)=>{
                return {
                    ...state,
                    practices: null
                }

            })

            
    }
})

export const getMyFlashcards = (state: any) => state.flashcard.myFlashcards
export const getPracticeCards = (state: any) => state.flashcard.practices
export default flashcardSlide.reducer;
