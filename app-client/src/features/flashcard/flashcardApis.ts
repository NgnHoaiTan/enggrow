import { createAsyncThunk } from '@reduxjs/toolkit';
import server from "../../apis/server";
import { useAppSelector } from '../../app/hooks';
import { getCurrentToken } from '../authentication/authSlice';

interface updateFlashcard {
    term?: string,
    meaning?: string,
    example?: string
}
interface createFlashcard {
    term: string,
    meaning?: string,
    example?: string,
    folderId: number
}
interface createSubmit {
    dataCard: createFlashcard,
    accessToken: string
}
interface updateSubmit {
    id: number | string
    dataCard: updateFlashcard
    accessToken: string
}
interface getCards {
    folderId: number | string,
    accessToken: string
}



export const asyncCreateFlashcard = createAsyncThunk('flashcard/asyncCreateFlashcard',
    async (submitData: createSubmit, { rejectWithValue }) => {
        try {
            const { dataCard, accessToken } = submitData
            const response = await server.post('flashcard/create',
                dataCard,
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


export const asyncUpdateFlashcard = createAsyncThunk('flashcard/asyncUpdateFlashcard', async (submitData: updateSubmit, { rejectWithValue }) => {
    try {
        const { id, dataCard, accessToken } = submitData
        const response = await server.put(`flashcard/update/${id}`,
            dataCard,
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

// export const asyncDeleteFolder = createAsyncThunk('folder/asyncDeleteFolder', async (id: number, { rejectWithValue }) => {
//     try {
//         const response = await server.delete(`folder-flashcard/delete/id/${id}`,
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                 }
//             }

//         )
//         return response.data
//     } catch (error: any) {
//         if (!error.response) {
//             throw error
//         }
//         return rejectWithValue(error.response.data)
//     }
// })

export const asyncGetFlashcardsByFolder = createAsyncThunk('flashcard/asyncGetFlashcardsByFolder',
    async (submitData: getCards, { rejectWithValue }) => {
        try {
            const { folderId, accessToken } = submitData
            const response = await server.get(`flashcard/folder/${folderId}`,
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
export const asyncGetPracticeCards = createAsyncThunk('flashcard/asyncGetPracticeCards',
    async (submitData: getCards, { rejectWithValue }) => {
        try {
            const { folderId, accessToken } = submitData
            const response = await server.get(`flashcard/practice-cards/folder/${folderId}`,
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
export const asyncPracticeCard = createAsyncThunk('flashcard/asyncPracticeCard',
    async (submitData: {id: any, grade:number, accessToken: string},{rejectWithValue}) => {
        try {
            const { id, grade, accessToken } = submitData
            const response = await server.put(`flashcard/practice/${id}`,
                {
                    grade:grade
                },
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
