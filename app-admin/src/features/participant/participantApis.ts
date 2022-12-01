import { createAsyncThunk } from '@reduxjs/toolkit';
import server from "../../apis/server";

interface dataCreate {
    accessToken: string,
    courseId: any

}
interface dataCheckRegister {
    accessToken: string,
    courseId: any
}
interface getbycourse {
    accessToken: string,
    courseId: any
}
interface getbyuser {
    accessToken: string,
    userId: any
}

export const asyncGetParticipantsByCourse = createAsyncThunk('participant/asyncGetParticipantsByCourse',
    async (dataSubmit: getbycourse, { rejectWithValue }) => {
        try {
            const { courseId, accessToken } = dataSubmit
            const response = await server.get(`participant-in-course/bycourse/${courseId}`,
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

export const asyncGetAllRegisterParticipants = createAsyncThunk('participant/asyncGetAllParticipants',
    async (accessToken: string, { rejectWithValue }) => {
        try {
            const response = await server.get(`participant-in-course/getall`,
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

export const asyncGetRecentRegistered = createAsyncThunk('participant/asyncGetRecentRegistered',
    async (accessToken: string, { rejectWithValue }) => {
        try {
            const response = await server.get(`participant-in-course/recent-register`,
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



export const asyncGetParticipantsByUser = createAsyncThunk('participant/asyncGetParticipantsByUser',
    async (dataSubmit: getbyuser, { rejectWithValue }) => {
        try {
            const { userId, accessToken } = dataSubmit
            const response = await server.get(`participant-in-course/byuser/${userId}`,
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



