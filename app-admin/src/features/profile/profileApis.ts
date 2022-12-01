import { createAsyncThunk } from '@reduxjs/toolkit';
import server from "../../apis/server";
import { addExperience, changeAvatar, createStaffProfile, deleteExperience, getmyprofile, updateBaseProfile, updateExperience, updateStaffProfile, uploadNewAvatar } from './interfaceApi';


export const asyncGetMyProfile = createAsyncThunk('profile/asyncGetMyProfile',
    async (dataSubmit: getmyprofile, { rejectWithValue }) => {
        try {
            const { accessToken } = dataSubmit
            const response = await server.get(`user/staff/profile`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            )
            return response.data
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)


export const asyncUpdateBaseProfile = createAsyncThunk('profile/asyncUpdateBaseProfile',
    async (dataSubmit: updateBaseProfile, { rejectWithValue }) => {
        try {
            const { data, accessToken, userId } = dataSubmit
            const response = await server.put(`user/${userId}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            )
            return response.data
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)
export const asyncAddStaffProfile = createAsyncThunk('profile/asyncAddStaffProfile',
    async (dataSubmit: createStaffProfile, { rejectWithValue }) => {
        try {
            const { data, accessToken} = dataSubmit
            const response = await server.post(`staff-profile`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            )
            return response.data
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)
export const asyncUpdateStaffProfile = createAsyncThunk('profile/asyncUpdateStaffProfile',
    async (dataSubmit: updateStaffProfile, { rejectWithValue }) => {
        try {
            const { data, accessToken, id} = dataSubmit
            const response = await server.put(`staff-profile/${id}`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            )
            return response.data
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)


// experience in profile
export const asyncAddExperience = createAsyncThunk('profile/asyncAddExperience',
    async(dataSubmit: addExperience, {rejectWithValue})=>{
        try {
            const { data, accessToken} = dataSubmit
            const response = await server.post(`staff-experience`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            )
            return response.data
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }   
)

export const asyncUpdateExperience = createAsyncThunk('profile/asyncUpdateExperience',
    async(dataSubmit: updateExperience, {rejectWithValue})=>{
        try {
            const { data, accessToken, id} = dataSubmit
            const response = await server.put(`staff-experience/${id}`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            )
            return response.data
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }   
)

export const asyncDeleteExperience = createAsyncThunk('profile/asyncDeleteExperience',
    async(dataSubmit: deleteExperience, {rejectWithValue}) => {
        try {
            const { accessToken, id} = dataSubmit
            const response = await server.delete(`staff-experience/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            )
            return response.data
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }

)

// avatar

export const asyncUploadNewAvatar = createAsyncThunk('profile/asyncUploadNewAvatar',
    async(dataSubmit: uploadNewAvatar, {rejectWithValue})=>{
        try {
            const { data, accessToken} = dataSubmit
            const response = await server.post(`avatar/upload-avatar`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            )
            return response.data
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }   
)

export const asyncChangeAvatar = createAsyncThunk('profile/asyncChangeAvatar',
    async(dataSubmit: changeAvatar, {rejectWithValue})=>{
        try {
            const { data, accessToken} = dataSubmit
            const response = await server.put(`avatar/change-avatar`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            )
            return response.data
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }   
)
export const asyncGetMyAlbumAvatar = createAsyncThunk('profile/asyncGetMyAlbumAvatar',
    async(accessToken: string, {rejectWithValue})=>{
        try {
            const response = await server.get(`avatar/my-avatars`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            )
            return response.data
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }   
)

