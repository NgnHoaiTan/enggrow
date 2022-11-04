import { createSlice } from '@reduxjs/toolkit';
import { asyncCreateFolder, asyncGetDuefolder, asyncGetFolderById, asyncGetMyFolders, asyncGetRemindPractice, asyncSearchFolderByName} from './folderApis';

interface folder {

}
export interface folderState {
    folders: any,
    folder: any,
    searchList: any,
    remind: [] | null,
    dueFolder: [] | null
}

const initialState: folderState = {
    folders: [],
    folder: {},
    searchList: [],
    remind: null,
    dueFolder: null
};

const folderSlice = createSlice({
    name: 'folder',
    initialState,
    reducers: {
        resetSearchList: (state) => {
            state.searchList = new Array()
        },
        resetRemind: (state) => {
            state.remind = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetFolderById.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    folder: payload
                }
            })
            .addCase(asyncGetMyFolders.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    folders: payload
                }
            })
            .addCase(asyncSearchFolderByName.fulfilled, (state, action) => {
                return {
                    ...state,
                    searchList: action.payload
                }
            })
            .addCase(asyncGetRemindPractice.fulfilled,(state,action)=>{
                return {
                    ...state,
                    remind: action.payload
                }
            })
            .addCase(asyncGetDuefolder.fulfilled, (state,action) => {
                return {
                    ...state,
                    dueFolder: action.payload
                }
            })
    }
})
export const {resetSearchList, resetRemind} = folderSlice.actions
export const getFolder = (state: any) => state.folder.folder
export const getFolders = (state: any) => state.folder.folders
export const getSearchList = (state: any) => state.folder.searchList
export const getRemindPractice = (state:any) => state.folder.remind
export const getDueFolder = (state: any) => state.folder.dueFolder
export default folderSlice.reducer;
