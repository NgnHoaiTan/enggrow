import { createAsyncThunk } from '@reduxjs/toolkit';
import server from "../../apis/server";

interface getListPaginationUsers {
    accessToken: string,
    query: {
        take: number,
        page: number
    }
}
interface searchPaginationUsers {
    accessToken: string,
    query: {
        name: string | null,
        page: number
    }
}
interface getProfileUser {
    accessToken: string,
    userId: any
}


export const asyncGetListPaginationUsers = createAsyncThunk('user_management/asyncGetListPaginationUsers',
    async (dataSubmit: getListPaginationUsers, { rejectWithValue }) => {
        try {
            const { accessToken, query } = dataSubmit
            const response = await server.get(`user-management/list-users` +
                `?page=${query.page}&take=${query.take}`
                ,
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
export const asyncSearchPaginationUsers = createAsyncThunk('user_management/asyncSearchPaginationUsers',
    async (dataSubmit: searchPaginationUsers, { rejectWithValue }) => {
        try {
            const { accessToken, query } = dataSubmit
            const response = await server.get(`user-management/search` +
                `?name=${query.name}`
                ,
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
export const asyncGetInfoUserById = createAsyncThunk('user_management/asyncGetInfoUserById',
    async (dataSubmit: getProfileUser, { rejectWithValue }) => {
        try {
            const { accessToken, userId} = dataSubmit
            const response = await server.get(`user-management/get-profile/${userId}`,
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