import { createAsyncThunk } from '@reduxjs/toolkit';
import server from "../../apis/server";

interface updateEpisode {
    name?: string,
    description?: string,
    file?: any
}
interface createEpisode {
    name?: string,
    description?: string,
    file?: any
}
interface createSubmit {
    data: createEpisode,
    accessToken: string
}
interface updateSubmit {
    id: any
    data: updateEpisode
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
interface getbycourse {
    courseId: any,
    accessToken: string,
    query?: any
}
export const asyncCreateEpisode = createAsyncThunk('episode/asyncCreateEpisode',
    async (dataSubmit: createSubmit, { rejectWithValue }) => {
        try {
            const { data, accessToken } = dataSubmit
            console.log(data)
            const response = await server.post('episode',
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
export const asyncUpdateEpisode = createAsyncThunk('episode/asyncUpdateEpisode',
    async (dataSubmit: updateSubmit, { rejectWithValue }) => {
        try {
            const { id, data, accessToken } = dataSubmit
            const response = await server.put(`episode/${id}`,
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
export const asyncDeleteEpisode = createAsyncThunk('episode/asyncDeleteEpisode',
    async (dataSubmit: deleteSubmit, { rejectWithValue }) => {
        try {
            const { id, accessToken } = dataSubmit
            const response = await server.delete(`episode/${id}`,
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
export const asyncGetAllEpisodesByCourse = createAsyncThunk('episode/asyncGetAllEpisodes',
    async (dataSubmit: getbycourse, { rejectWithValue }) => {
        try {
            const {courseId, accessToken, query} = dataSubmit
            const response = await server.get(`episode/getbycourse/${courseId}${query ? `${query.name ? `?name=${query.name}`:''}` : ''}`,
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

export const asyncGetEpisodeById = createAsyncThunk('episode/asyncGetEpisodeById',
    async (dataSubmit: getDataType, { rejectWithValue }) => {
        try {
            const {id, accessToken} = dataSubmit
            const response = await server.get(`episode/${id}`,
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