import { createAsyncThunk } from "@reduxjs/toolkit"
import server from "../../apis/server"

interface createPronounceHistory {
    data: {
        score_gain: number,
        flashcardId: number,
        userId: number,
        file: any
    }
    accessToken: string
}
interface getHistoryPronouncebycard {
    flashcardId: any,
    accessToken: string
}

export const asyncSavePronounceResult = createAsyncThunk('flashcard/asyncSavePronounceResult',
    async (submitData: createPronounceHistory, { rejectWithValue }) => {
        try {
            const { data, accessToken } = submitData
            const response = await server.post(`card-pronunciation-result`,
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
})

export const asyncGetTodayPronounceResultByUser = createAsyncThunk('flashcard/asyncGetTodayPronounceResultByUser',
    async (accessToken: string, { rejectWithValue }) => {
        try {
            const response = await server.get(`card-pronunciation-result/today`,
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
})

export const asyncGetPronounceByCard = createAsyncThunk('flashcard/asyncGetPronounceByCard',
    async (dataSubmit: getHistoryPronouncebycard, { rejectWithValue }) => {
        try {
            const {flashcardId, accessToken} = dataSubmit
            const response = await server.get(`card-pronunciation-result/getbyflashcard/${flashcardId}`,
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
})