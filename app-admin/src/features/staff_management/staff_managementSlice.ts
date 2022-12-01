import {createSlice} from '@reduxjs/toolkit';
import { asyncGetListStaffs, asyncGetStaffById } from './staff_managementApis';

interface staff {

}
interface initialState {
    staffs: any[] | null,
    staff: any
}
const initialState: initialState = {
    staffs: null,
    staff: null
}

const staffManagementSlice = createSlice({
    name: 'staff_management',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetListStaffs.fulfilled, (state,action) => {
                return {
                    ...state,
                    staffs: action.payload
                }
            })
            .addCase(asyncGetStaffById.fulfilled,(state,action) => {
                return {
                    ...state,
                    staff: action.payload
                }
            })
    }
})
export const getStaffProfile = (state: any) => state.staff_management.staff
export const getStaffs = (state: any) => state.staff_management.staffs
export default staffManagementSlice.reducer