import { createAsyncThunk } from '@reduxjs/toolkit';
import server from "../../apis/server";

export const asyncManuallyBackupData = createAsyncThunk('backup/asyncManuallyBackupData',
    async(accessToken: string,{rejectWithValue}) => {
        try{
            console.log(accessToken)
            const response = await server.post('backup',
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
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