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
export const asyncGetAllMyRegisteredCourse = createAsyncThunk('',
    async(accessToken: string,{rejectWithValue}) => {
        try{
            const response = await server.get(`participant-in-course/registered-course`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            )
            return response.data
            
        }catch(error: any) {
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
export const asyncCheckRegister = createAsyncThunk('participant/asyncCreateParticipant',
    async (dataSubmit: dataCheckRegister, { rejectWithValue }) => {
        try {
            const { courseId, accessToken} = dataSubmit
            let data = {
                courseId: courseId
            }
            const response = await server.post(`participant-in-course/check-register`,
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

export const asyncCreateParticipant = createAsyncThunk('participant/asyncCreateParticipant',
    async (dataSubmit: dataCreate, { rejectWithValue }) => {
        try {
            const { courseId, accessToken} = dataSubmit
            let data = {
                courseId: courseId
            }
            const response = await server.post(`participant-in-course`,
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

