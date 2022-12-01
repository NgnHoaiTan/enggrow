import { createAsyncThunk } from '@reduxjs/toolkit';
import server from "../../apis/server";

interface createStaff {
    data: {
        username: string,
        password: string,
        name: string,
    },
    accessToken: string
}
interface getbystaff {
    id: any,
    accessToken: string
}
interface deleteStaff {
    id: any,
    accessToken: string
}

export const asyncGetListStaffs = createAsyncThunk('staff_management/asyncGetListStaffs',
    async (accessToken: string, { rejectWithValue }) => {
        try {
            const response = await server.get('staff-management/getall',
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
export const asyncGetStaffById = createAsyncThunk('staff_management/asyncGetStaffById',
    async (dataSubmit: getbystaff, { rejectWithValue }) => {
        try {
            const { id, accessToken } = dataSubmit
            const response = await server.get(`staff-management/staff/${id}`,
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

export const asyncRegisterNewStaff = createAsyncThunk('staff_management/asyncRegisterNewStaff',
    async (dataSubmit: createStaff, { rejectWithValue }) => {
        try {
            const { data, accessToken } = dataSubmit
            const response = await server.post('staff-management/new-staff',
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
export const asyncDeleteStaff = createAsyncThunk('staff_management/asyncDeleteStaff',
    async (dataSubmit: deleteStaff, { rejectWithValue }) => {
        try {
            const { id, accessToken } = dataSubmit
            const response = await server.delete(`staff-management/${id}`,
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