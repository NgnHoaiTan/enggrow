import { createAsyncThunk } from '@reduxjs/toolkit';
import server from "../../apis/server";

interface pronunciation_exercise {
    id: number,
    phrase: string,
    meaning: string,
    episodeId: number
}
interface identification_exercise {
    id: number,
    true_word: string
    false_word: string,
    audio: any,
    episodeId: number
}



interface getbyid {
    id: any,
    accessToken: string
}

// pronunciation exercise
interface getbyepisode {
    episodeId: any,
    accessToken: string
}
export const asyncGetAllPronunciationExercisesByEpisode = createAsyncThunk('exercise/asyncGetAllPronunciationExercises',
    async (dataSubmit: getbyepisode, { rejectWithValue }) => {
        try {
            const { episodeId, accessToken } = dataSubmit
            const response = await server.get(`pronunciation_exercise/getbyepisode/${episodeId}`,
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

export const asyncGetPronunciationExerciseById = createAsyncThunk('exercise/asyncGetPronunciationExerciseById',
    async (dataSubmit: getbyid, { rejectWithValue }) => {
        try {
            const { id, accessToken } = dataSubmit
            const response = await server.get(`pronunciation_exercise/${id}`,
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

// identification exercise
export const asyncGetAllIdentificationExercisesByEpisode = createAsyncThunk('exercise/asyncGetAllIdentificationExercises',
    async (dataSubmit: getbyepisode, { rejectWithValue }) => {
        try {
            const { episodeId, accessToken } = dataSubmit
            const response = await server.get(`identification_exercise/getbyepisode/${episodeId}`,
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

export const asyncGetIdentificationExerciseById = createAsyncThunk('exercise/asyncGetIdentificationExerciseById',
    async (dataSubmit: getbyid, { rejectWithValue }) => {
        try {
            const { id, accessToken } = dataSubmit
            const response = await server.get(`identification_exercise/${id}`,
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