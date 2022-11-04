import { createAsyncThunk} from '@reduxjs/toolkit';
import server from "../../apis/server";

export const asyncLogin = createAsyncThunk("auth/asyncLogin", async (data: any, { rejectWithValue }) => {
    try {
        const response = await server.post('auth/login',
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }

        )
        return response.data
    }catch (error: any) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
    
    
})
export const asyncSignup = createAsyncThunk("auth/asyncSignup", async (data: any, { rejectWithValue }) => {
    try {
        const response = await server.post('auth/signup',
            data,
            {
                headers: {
                    "Content-Type": "application/json",
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

export const asyncRefreshToken = createAsyncThunk('auth/asyncRefreshToken', async () => {
    const response = await server.post('auth/refresh')
    return response.data
})
export const asyncLogout = createAsyncThunk("auth/asyncLogout", async () => {
    const response = await server.post('auth/logout')
    return response.data
})