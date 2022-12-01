import { createAsyncThunk } from "@reduxjs/toolkit"
import server from "../../apis/server"

interface createLearningHistory {
    data: {
        score_gain: number,
        flashcardId: number,
        userId: number
    }
    accessToken: string
}
interface getLearningHistorybygroupdate {
    flashcardId: any,
    accessToken: string
}
interface getLearnCardResult {
    query: {
        duration: number
    },
    accessToken: string
}

export const asyncSaveLearningHistory = createAsyncThunk('cardlearned/asyncSaveLearningHistory',
    async (submitData: createLearningHistory, { rejectWithValue }) => {
        try {
            const { data, accessToken } = submitData
            const response = await server.post(`card-learned`,
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
})

export const asyncGetLearnedCardResultByUser = createAsyncThunk('cardlearned/asyncGetTodayLearnedCardResultByUser',
    async (dataSubmit: getLearnCardResult, { rejectWithValue }) => {
        try {
            const {query, accessToken} = dataSubmit
            const response = await server.get(`card-learned/byuser`+
            `${query ? `?duration=${query.duration}` : ``}`,
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

export const asyncGetTodayLearnedCardtByUser = createAsyncThunk('cardlearned/asyncGetTodayLearnedCardtByUser',
    async (accessToken: string, { rejectWithValue }) => {
        try {
            const response = await server.get(`card-learned/today/byuser`,
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
