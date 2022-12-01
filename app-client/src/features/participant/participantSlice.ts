import {createSlice} from '@reduxjs/toolkit';
import { Action } from '@remix-run/router';
import { asyncCheckRegister, asyncCreateParticipant, asyncGetAllMyRegisteredCourse, asyncGetParticipantsByUser } from './participantApis';

interface participant {
    id: number,
    created_at: string,
    participantId: number,
    courseId: number
}
interface initialState {
    participants: participant[] | null,
    registered: participant | null
}
const initialState:initialState = {
    participants: null,
    registered: null
}
const participantSlice = createSlice({
    name:'participant',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetAllMyRegisteredCourse.fulfilled,(state,action) => {
                return {
                    ...state,
                    participants: action.payload
                }
            })
            .addCase(asyncCheckRegister.fulfilled,(state,action)=>{
                return {
                    ...state,
                    registered: action.payload
                }
            })
    }
})
export const getCheckRegistered = (state:any) => state.participant.registered
export const getParticipants = (state: any) => state.participant.participants
export default participantSlice.reducer