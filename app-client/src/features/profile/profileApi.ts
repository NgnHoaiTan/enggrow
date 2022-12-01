

import { createAsyncThunk } from '@reduxjs/toolkit';
import server from "../../apis/server";

export interface updateBaseProfile {
    data: {
        name?:string,
        address?: string,
        email?: string,
        phone_number?: string,
        dob?: any
    }
    accessToken: string,
    userId: any
}
export interface uploadNewAvatar {
    data: {
        file: any
    }
    accessToken: string
}

export interface changeAvatar {
    data: {
        avatarId: any,
    }
    accessToken: string
}
export interface deleteAvatar {
    avatarId: any,
    accessToken: string
}

export const asyncGetMyProfile = createAsyncThunk('profile/asyncGetMyProfile',
    async (accessToken: string, { rejectWithValue }) => {
        try {
            const response = await server.get(`user/profile`,
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

export const asyncUploadNewAvatar = createAsyncThunk('profile/asyncUploadNewAvatar',
    async (dataSubmit: uploadNewAvatar, { rejectWithValue }) => {
        try {
            const { data, accessToken } = dataSubmit
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
    async (dataSubmit: changeAvatar, { rejectWithValue }) => {
        try {
            const { data, accessToken } = dataSubmit
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
    async (accessToken: string, { rejectWithValue }) => {
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
