import {createSlice} from '@reduxjs/toolkit';
import { asyncGetAllRegisterParticipants, asyncGetParticipantsByCourse, asyncGetParticipantsByUser, asyncGetRecentRegistered } from './participantApis';

interface participant {
    id: number,
    created_at: string,
    participantId: number,
    courseId: number
}
interface initialState {
    all_participants: participant[] | null,
    recent_registered: participant[] | null,
    participants_of_course: participant[] | null
}
const initialState:initialState = {
    all_participants: null,
    participants_of_course: null,
    recent_registered: null
}
const participantSlice = createSlice({
    name:'participant',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetAllRegisterParticipants.fulfilled,(state,action) => {
                return {
                    ...state,
                    all_participants: action.payload
                }
            })
            .addCase(asyncGetRecentRegistered.fulfilled,(state,action)=>{
                return {
                    ...state,
                    recent_registered: action.payload
                }
            })
            .addCase(asyncGetParticipantsByCourse.fulfilled,(state,action) => {
                return {
                    ...state,
                    participants_of_course: action.payload
                }
            })
    }
})
export const getParticipantsOfCourse = (state: any) => state.participant.participants_of_course
export const getRecentRegistered = (state:any) => state.participant.recent_registered
export const getParticipants = (state: any) => state.participant.all_participants
export default participantSlice.reducer