import { createAsyncThunk } from '@reduxjs/toolkit';
import server from "../../apis/server";


interface getonebyid {
    id: any,
    accessToken: string
}
interface getall {
    accessToken: string,
    query?: {
        name: string | null,
        level: string | null
    }
}

export const asyncGetAllPronunCourses = createAsyncThunk('pronunciation_course/asyncGetAllPronunCourses',
    async (dataSubmit: getall, { rejectWithValue }) => {
        try {
            const { query, accessToken } = dataSubmit
            const response = await server.get(`pronunciation-practice/getall` +
                `${query ? 
                    `${query.name ? `?name=${query.name}` : '?'}${query.level ? `&level=${query.level}`:''}`
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

export const asyncGetPronunCourseById = createAsyncThunk('pronunciation_course/asyncGetPronunCourseById',
    async (dataSubmit: getonebyid, { rejectWithValue }) => {
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