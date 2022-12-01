import { createAsyncThunk } from '@reduxjs/toolkit';
import server from "../../apis/server";

interface phone {
    label_ipa: string,
    score: number
}
interface word_assessment {
    label: string,
    score: number,
    phones: phone[]
}
interface result {
    file: any,
    score_gain: number,
    exerciseId: number,
    word_assessments: word_assessment[]
}

interface dataCreate {
    data: result,
    accessToken: string
}
interface dataGetByExercise {
    exerciseId: any,
    accessToken: string
}

export const asyncCreatePronunciationResult = createAsyncThunk('result_pronunciation/asyncCreatePronunciationResult',
    async (dataSubmit: dataCreate, { rejectWithValue }) => {
        try {
            const { data, accessToken } = dataSubmit
            const response = await server.post('result-pronunciation-exercise',
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
export const asyncGetHistoryAssessmentsByExercise = createAsyncThunk('result_pronunciation/asyncGetHistoryAssessmentsByExercise',
    async(dataSubmit: dataGetByExercise,{rejectWithValue})=>{
        try{
            const { exerciseId, accessToken } = dataSubmit
            const response = await server.get(`result-pronunciation-exercise/getall/byexercise/${exerciseId}`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            )
            return response.data
        }catch(error: any){
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)