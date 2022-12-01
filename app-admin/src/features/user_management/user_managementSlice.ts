import {createSlice} from '@reduxjs/toolkit';
import { asyncGetInfoUserById, asyncGetListPaginationUsers, asyncSearchPaginationUsers } from './user_managementApis';

interface user {
    id: number,
    name: string,
    current_avatar: string,
    email: string,
    address: string,
    phone_number: string,
    dob: string,
    created_at: string
}
interface dataPagination {
    data: user[] | null,
    count: number,
    currentPage: number,
    nextPage: number | null,
    prevPage: number | null,
    lastPage: number,
    firstPage: number
}
interface initialState {
    list_users: dataPagination | null,
    profile_user: user | null,
    search_results: dataPagination | null
}
const initialState: initialState = {
    list_users: null,
    profile_user: null,
    search_results: null
}

const userManagementSlice = createSlice({
    name: 'user_management',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetListPaginationUsers.fulfilled, (state, action) => {
                return {
                    ...state,
                    list_users: action.payload
                }
            })
            .addCase(asyncGetInfoUserById.fulfilled, (state, action) => {
                return {
                    ...state,
                    profile_user: action.payload
                }
            })
            .addCase(asyncSearchPaginationUsers.fulfilled, (state, action) => {
                return {
                    ...state,
                    search_results: action.payload
                }
            })
    }
})
export const getProfileUser = (state: any) => state.user_management.profile_user
export const searchPaginationUsers = (state: any) => state.user_management.search_results
export const getListPaginationUsers = (state: any) => state.user_management.list_users
export default userManagementSlice.reducer