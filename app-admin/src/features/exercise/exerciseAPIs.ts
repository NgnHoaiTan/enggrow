import { createAsyncThunk } from '@reduxjs/toolkit';
import server from "../../apis/server";

interface updateExercise {
    phrase: string,
    meaning?: string,
}
interface createExercise {
    phrase: string,
    meaning?: string,
    episodeId: number
}
interface createSubmit {
    data: createExercise,
    accessToken: string
}
interface updateSubmit {
    id: any
    data: updateExercise
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

export const asyncCreateExercise = createAsyncThunk('exercise/asyncCreateExercise',
    async (dataSubmit: createSubmit, { rejectWithValue }) => {
        try {
            const { data, accessToken } = dataSubmit
            const response = await server.post('exercise',
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
export const asyncUpdateExercise = createAsyncThunk('exercise/asyncUpdateExercise',
    async (dataSubmit: updateSubmit, { rejectWithValue }) => {
        try {
            const { id, data, accessToken } = dataSubmit
            const response = await server.put(`exercise/${id}`,
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
export const asyncDeleteExercise = createAsyncThunk('exercise/asyncDeleteExercise',
    async (dataSubmit: deleteSubmit, { rejectWithValue }) => {
        try {
            const { id, accessToken } = dataSubmit
            const response = await server.delete(`exercise/${id}`,
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
interface getbyepisode {
    episodeId: any,
    accessToken: string
}
export const asyncGetAllExercisesByEpisode = createAsyncThunk('exercise/asyncGetAllExercises',
    async (dataSubmit: getbyepisode, { rejectWithValue }) => {
        try {
            const {episodeId, accessToken} = dataSubmit
            const response = await server.get(`exercise/getbyepisode/${episodeId}`,
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

export const asyncGetExerciseById = createAsyncThunk('exercise/asyncGetExerciseById',
    async (dataSubmit: getDataType, { rejectWithValue }) => {
        try {
            const {id, accessToken} = dataSubmit
            const response = await server.get(`exercise/${id}`,
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