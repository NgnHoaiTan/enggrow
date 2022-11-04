import { createAsyncThunk } from '@reduxjs/toolkit';
import server from "../../apis/server";

interface updateFolder {
    name?: string,
    description?: string
}
interface createFolder {
    name: string,
    description: string,
    userId: number
}
interface updateSubmit {
    id: number | string
    data: updateFolder
    accessToken: string
}
interface dataSearch {
    name: string,
    accessToken:string
}

export const asyncCreateFolder = createAsyncThunk('folder/asyncCreateFolder', async (data: createFolder, { rejectWithValue }) => {
    try {
        const response = await server.post('folder-flashcard/create',
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


export const asyncUpdateFolder = createAsyncThunk('folder/asyncUpdateFolder', async (dataSubmit: updateSubmit, { rejectWithValue }) => {
    try {
        const { id, data, accessToken } = dataSubmit
        const response = await server.put(`folder-flashcard/update/${id}`,
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

export const asyncDeleteFolder = createAsyncThunk('folder/asyncDeleteFolder', async (dataSubmit: {id:any,accessToken: string}, { rejectWithValue }) => {
    try {
        const {id, accessToken} = dataSubmit
        const response = await server.delete(`folder-flashcard/delete/${id}`,
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

export const asyncGetMyFolders = createAsyncThunk('folder/asyncGetMyFolders', async (dataSubmit:{userId: any, accessToken: string}, { rejectWithValue }) => {
    try {
        const {userId, accessToken} = dataSubmit
        const response = await server.get(`folder-flashcard/all/user/${userId}`,
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
export const asyncGetFolderById = createAsyncThunk('folder/asyncGetFolderById', async (dataSubmit:{id: any, accessToken: string}, { rejectWithValue }) => {
    try {
        const {id, accessToken} = dataSubmit
        const response = await server.get(`folder-flashcard/id/${id}`,
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

export const asyncSearchFolderByName = createAsyncThunk('folder/asyncSearchFolderByName', async (dataSearch: dataSearch, { rejectWithValue }) => {
    try {
        const {name, accessToken} = dataSearch
        const response = await server.get(`folder-flashcard/search?name=${name}`,
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

interface dataGetRemind {
    accessToken: string
}
export const asyncGetRemindPractice = createAsyncThunk('folder/asyncGetRemindPractice',async(dataGetRemind: dataGetRemind,{rejectWithValue})=>{
    try {
        const {accessToken} = dataGetRemind
        const response = await server.get(`folder-flashcard/practice/remind`,
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


export const asyncGetDuefolder = createAsyncThunk('', async(accessToken: string, {rejectWithValue})=>{
    try {
        const response = await server.get(`folder-flashcard/duefolder`,
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


