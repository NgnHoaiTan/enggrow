import { createSlice } from '@reduxjs/toolkit';
import { asyncGetMyAlbumAvatar, asyncGetMyProfile } from './profileApis';

interface profile {
    id: number,
    name: string,
    email: string,
    phone_number: string,
    address: string,
    current_avatar: string,
    dob: string
}
interface initialState {
    profile: profile | null,
    avatars: any[] | null
}
const initialState: initialState = {
    profile: null,
    avatars: null
}
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetMyProfile.fulfilled, (state, action) => {
                return {
                    ...state,
                    profile: action.payload
                }
            })
            .addCase(asyncGetMyAlbumAvatar.fulfilled, (state, action) => {
                return {
                    ...state,
                    avatars: action.payload
                }

            })
    }
})
export const getMyAvatars = (state: any) => state.profile.avatars
export const getMyProfile = (state: any) => state.profile.profile
export default profileSlice.reducer

