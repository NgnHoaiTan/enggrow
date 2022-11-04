import { createSlice } from '@reduxjs/toolkit';

interface errorState {
    networkError: string | null,
    notfoundError: {
        status: number,
        message: string
    } | null
}
const initialState:errorState = {
    networkError: null,
    notfoundError: null
}
const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers:{
        setNetworkError: (state) => {
            state.networkError = "Network Error"
        },

        setNotFoundError: (state) => {
            state.notfoundError = {
                status: 404,
                message: 'Not Found Page'
            }
        },
        refreshError: (state) => {
            console.log('refresh error')
            state.networkError = null
            state.notfoundError = null
        }
    }
})
export const getNetworkError = (state: any) => state.error.networkError;
export const getNotfoundError = (state:any) => state.error.notfoundError;
export const {setNetworkError, setNotFoundError, refreshError } = errorSlice.actions
export default errorSlice.reducer