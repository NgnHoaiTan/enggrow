import { createAsyncThunk } from '@reduxjs/toolkit';
import server from "../../apis/server";

interface updateCourse {
    name?: string,
    description?: string,
    level?: string,
    file?: any
}
interface createCourse {
    name?: string,
    description?: string,
    level?: string,
    file?: any
}
interface createSubmit {
    data: createCourse,
    accessToken: string
}
interface updateSubmit {
    id: any
    data: updateCourse
    accessToken: string
}
interface deleteSubmit {
    id: any,
    accessToken: string
}
interface getDataType {
    id: any,
    accessToken: string
}
interface getall {
    accessToken: string,
    query?: any
}


export const asyncCreatePronunCourse = createAsyncThunk('pronunciation_course/asyncCreatePronunCourse',
    async (dataSubmit: createSubmit, { rejectWithValue }) => {
        try {
            const { data, accessToken } = dataSubmit
            const response = await server.post('pronunciation-practice',
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
export const asyncUpdatePronunCourse = createAsyncThunk('pronunciation_course/asyncUpdatePronunCourse',
    async (dataSubmit: updateSubmit, { rejectWithValue }) => {
        try {
            const { id, data, accessToken } = dataSubmit
            const response = await server.put(`pronunciation-practice/${id}`,
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
export const asyncDeletePronunCourse = createAsyncThunk('pronunciation_course/asyncDeletePronunCourse',
    async (dataSubmit: deleteSubmit, { rejectWithValue }) => {
        try {
            const { id, accessToken } = dataSubmit
            const response = await server.delete(`pronunciation-practice/${id}`,
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
export const asyncGetAllPronunCourses = createAsyncThunk('pronunciation_course/asyncGetAllPronunCourses',
    async (dataSubmit: getall, { rejectWithValue }) => {
        try {
            const { query, accessToken } = dataSubmit
            const response = await server.get(`pronunciation-practice/getall` +
                `${query ? `${query.name ? `?name=${query.name}` : ''}`
                    :
                    ''}`,
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
export const asyncGetNewPronunCourses = createAsyncThunk('pronunciation_course/asyncGetNewPronunCourses',
    async (accessToken: string, { rejectWithValue }) => {
        try {
            const response = await server.get(`pronunciation-practice/getnew`,
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
export const asyncGetPronunCourseById = createAsyncThunk('pronunciation_course/asyncGetPronunCourseById',
    async (dataSubmit: getDataType, { rejectWithValue }) => {
        try {
            const { id, accessToken } = dataSubmit
            const response = await server.get(`pronunciation-practice/getbyid/${id}`,
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