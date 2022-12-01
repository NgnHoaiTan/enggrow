import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import CreateModel from '../components/management_staff/CreateModel';
import TableStaff from '../components/management_staff/TableStaff';
import { getCurrentToken } from '../features/authentication/authSlice';
import { asyncGetListStaffs } from '../features/staff_management/staff_managementApis';

const StaffsManagement = () => {
    const [showModelCreate, setShowModelCreate] = useState(false)
    const [loadingStaffs, setLoadingStaffs] = useState(true)
    const [errorLoadingStaffs, setErrorLoadingStaffs] = useState('')
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)

    const handleCloseModelCreate = () => {
        setShowModelCreate(false)
    }
    useEffect(()=>{
        const action = async() => {
            try{
                setLoadingStaffs(()=>true)
                await dispatch(asyncGetListStaffs(accessToken)).unwrap()
            }catch(error: any) {
                if(error.message) {
                    setErrorLoadingStaffs(error.message)
                }else {
                    setErrorLoadingStaffs('Unkown error happen when loading data from server')
                }
                
            }
        }
        action()
        setLoadingStaffs(()=>false)
    },[])
    return (
        <div className='p-2'>
            <h2 className='font-bold text-xl mb-5'>Quản lý nhân viên</h2>
            <button
                onClick={() => setShowModelCreate(true)}
                className='my-3 rounded-xl py-[6px] px-4 font-semibold text-white bg-[#6c3fc0]'>
                Thêm tài khoản nhân viên
            </button>
            <CreateModel showModel={showModelCreate} onClose={handleCloseModelCreate}/>
            <TableStaff loading={loadingStaffs} error={errorLoadingStaffs}/>
        </div>
    );
};

export default StaffsManagement;