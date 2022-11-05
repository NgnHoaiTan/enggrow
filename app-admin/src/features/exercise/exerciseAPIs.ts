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



interface createPronunciationExercise {
    data: {
        phrase: string,
        meaning?: string,
        episodeId: number
    }
    accessToken: string
}
interface createIdentificationExercise {
    data: {
        true_word: string
        false_word: string,
        audio: any,
        episodeId: number
    }
    accessToken: string
}

interface updatePronunciationExerciseSubmit {
    id: any
    data: {
        phrase: string,
        meaning?: string,
        episodeId: number
    }
    accessToken: string
}
interface updateIdentificationExerciseSubmit {
    id: any
    data: {
        true_word: string
        false_word: string,
        audio?: any,
        episodeId: number
    }
    accessToken: string
}

interface deleteSubmit {
    id: any,
    accessToken: string
}
interface getbyid {
    id: any,
    accessToken: string
}

// pronunciation exercise
export const asyncCreatePronunciationExercise = createAsyncThunk('exercise/asyncCreatePronunciationExercise',
    async (dataSubmit: createPronunciationExercise, { rejectWithValue }) => {
        try {
            const { data, accessToken } = dataSubmit
            const response = await server.post('pronunciation_exercise',
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
export const asyncUpdatePronunciationExercise = createAsyncThunk('exercise/asyncUpdatePronunciationExercise',
    async (dataSubmit: updatePronunciationExerciseSubmit, { rejectWithValue }) => {
        try {
            const { id, data, accessToken } = dataSubmit
            const response = await server.put(`pronunciation_exercise/${id}`,
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
export const asyncDeletePronunciationExercise = createAsyncThunk('exercise/asyncDeletePronunciationExercise',
    async (dataSubmit: deleteSubmit, { rejectWithValue }) => {
        try {
            const { id, accessToken } = dataSubmit
            const response = await server.delete(`pronunciation_exercise/${id}`,
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


export const asyncCreateIdentificationExercise = createAsyncThunk('exercise/asyncCreateIdentificationExercise',
    async (dataSubmit: createIdentificationExercise, { rejectWithValue }) => {
        try {
            const { data, accessToken } = dataSubmit
            const response = await server.post('pronunciation_exercise',
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
export const asyncUpdateIdentificationExercise = createAsyncThunk('exercise/asyncUpdateIdentificationExercise',
    async (dataSubmit: updateIdentificationExerciseSubmit, { rejectWithValue }) => {
        try {
            const { id, data, accessToken } = dataSubmit
            const response = await server.put(`pronunciation_exercise/${id}`,
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
export const asyncDeleteIdentificationExercise = createAsyncThunk('exercise/asyncDeleteIdentificationExercise',
    async (dataSubmit: deleteSubmit, { rejectWithValue }) => {
        try {
            const { id, accessToken } = dataSubmit
            const response = await server.delete(`pronunciation_exercise/${id}`,
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
export const asyncGetAllIdentificationExercisesByEpisode = createAsyncThunk('exercise/asyncGetAllIdentificationExercises',
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

export const asyncGetIdentificationExerciseById = createAsyncThunk('exercise/asyncGetIdentificationExerciseById',
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