import {createSlice} from '@reduxjs/toolkit';
import { asyncLogin, asyncLogout} from './authAPIs';
export interface AuthenticationState {
    user:any,
    token:string | null,
    loading:boolean
}

const initialState: AuthenticationState = {
    user:null,
    token:null,
    loading: false
};


const authSlice = createSlice({
    name: 'admin_auth',
    initialState,
    reducers: {
        setCredentials: (state,action) => {
            const {user, accessToken} = action.payload
            state.user = user
            state.token = accessToken
            console.log(action.payload)
        },
        logOut: (state) =>{
            state.user = null
            state.token = null
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(asyncLogin.pending, (state, action)=>{
                return {
                    ...state,
                    loading: true
                }
            })
            .addCase(asyncLogin.fulfilled, (state, action)=>{
                return {
                    ...state,
                    loading:false,
                    user: action.payload.user,
                    token: action.payload.access_token
                }
            })
            .addCase(asyncLogin.rejected, (state, action)=>{
                return {
                    ...state,
                    loading: false
                }
            })
            .addCase(asyncLogout.fulfilled, (state, action)=>{
                console.log(action)
            })

    }
})
export const {setCredentials} = authSlice.actions
export const getLoading =(state:any) => state.admin_auth.loading
export const getCurrentUser = (state: any) => state.admin_auth.user
export const getCurrentToken =(state: any) => state.admin_auth.token
export default authSlice.reducer;