import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { asyncGetStaffById } from '../../features/staff_management/staff_managementApis';
import { getStaffs } from '../../features/staff_management/staff_managementSlice';
import ModelProfile from './ModelProfile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';

interface staff {
    id: number
}
interface typeProps {
    loading: boolean,
    error: string
}
const TableStaff = (props: typeProps) => {
    const { loading, error } = props
    const [deleteStaff, setDeleteStaff] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [loadingProfile, setLoadingProfile] = useState(true)
    const [errorShowProfile, setErrorShowProfile] = useState('')
    const listStaff = useAppSelector(getStaffs)
    const accessToken = useAppSelector(getCurrentToken)
    const dispatch = useDispatch<AppDispatch>()


    const onDeleteStaff = (message: string) => {
        console.log('delete')
        notifySuccess(message)
    }
    const notifySuccess = (message: string) => toast.success(message)

    const handleCloseProfile = () => {
        setShowProfile(false)
    }
    const handleViewProfile = async (staffId: number) => {
        try {
            setErrorShowProfile('')
            setLoadingProfile(() => true)
            let dataSubmit = {
                id: staffId,
                accessToken: accessToken
            }
            await dispatch(asyncGetStaffById(dataSubmit)).unwrap()
            setLoadingProfile(() => false)
            setShowProfile(true)
        } catch (error: any) {
            setLoadingProfile(() => false)
            if (error.message) {
                setErrorShowProfile(error.message)
            }
            else setErrorShowProfile('Lỗi không xác định')
        }
    }




    if (loading) {
        return (
            <div>
            </div>
        )
    }
    else if (error) {
        return (
            <div>
            </div>
        )
    }
    else if (!listStaff) {
        return (
            <div className='w-full rounded-xl drop-shadow-md overflow-hidden mb-5'>

                <table className='bg-white w-full '>
                    <thead>
                        <tr className='bg-[#8347c3] text-white'>
                            <th className='py-2 px-2 text-sm'>#</th>
                            <th className='py-2 text-sm text-left'>Tên</th>
                            <th className='py-2 text-sm text-left'>Tài khoản</th>
                            <th className='py-2 text-sm text-left'>Ngày tham gia</th>
                            <th className='py-2 text-sm text-left'>Email</th>
                            <th className='py-2 text-sm text-left'>Số điện thoại</th>
                            <th className='py-2 text-sm'>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={7} className='h-[300px] text-center font-semibold text-lg text-[#3f3f3f]'>
                                Danh sách nhân viên không thể kết nối
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
    else if (listStaff.length == 0) {
        return (
            <div className='w-full rounded-xl drop-shadow-md overflow-hidden mb-5'>
                <table className='bg-white w-full '>
                    <thead>
                        <tr className='bg-[#8347c3] text-white'>
                            <th className='py-2 px-2 text-sm'>#</th>
                            <th className='py-2 text-sm text-left'>Tên</th>
                            <th className='py-2 text-sm text-left'>Tài khoản</th>
                            <th className='py-2 text-sm text-left'>Ngày tham gia</th>
                            <th className='py-2 text-sm text-left'>Email</th>
                            <th className='py-2 text-sm text-left'>Số điện thoại</th>
                            <th className='py-2 text-sm'>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={7} className='h-[300px] text-center font-semibold text-lg text-[#3f3f3f]'>
                                Danh sách chưa có nhân viên, thêm nhân viên?
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div className='w-full rounded-xl drop-shadow-md overflow-hidden mb-5'>
            <div className="absolute top-0">
                <ToastContainer
                    position="top-right"
                    draggable={true}
                    autoClose={3000}
                />
            </div>

            <table className='bg-white w-full '>
                <thead>
                    <tr className='bg-[#8347c3] text-white'>
                            <th className='py-2 px-2 text-sm'>#</th>
                            <th className='py-2 text-sm text-left'>Tên</th>
                            <th className='py-2 text-sm text-left'>Tài khoản</th>
                            <th className='py-2 text-sm text-left'>Ngày tham gia</th>
                            <th className='py-2 text-sm text-left'>Email</th>
                            <th className='py-2 text-sm text-left'>Số điện thoại</th>
                            <th className='py-2 text-sm'>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listStaff.map((item: any, index: number) => {
                            return (
                                <tr key={item.id} className='bg-white'>
                                    <td className='px-2 py-3 text-sm font-semibold text-center'>
                                        {index + 1}
                                    </td>
                                    <td className='py-3 text-sm font-semibold flex items-center gap-3'>
                                        <div className='w-7 h-7 rounded-full'>
                                            <img
                                                className='w-full h-full rounded-full object-cover drop-shadow-sm'
                                                src={item.current_avatar} alt="avatar" />
                                        </div>

                                        {item.name}
                                    </td>
                                    <td className='py-3 text-sm font-semibold'>
                                        {item.username}
                                    </td>
                                    <td className='py-3 text-sm font-semibold'>
                                        {dayjs(item.created_at).format('DD/MM/YYYY hh:mm:ss')}
                                    </td>
                                    {item.email ?
                                        <td className='py-3 text-sm font-semibold'>
                                            {item.email}
                                        </td>
                                        :
                                        <td className='py-3 text-sm font-semibold text-[#2c76b6]'>
                                            chưa cập nhật
                                        </td>
                                    }
                                    {item.phone_number ?
                                        <td className='py-3 text-sm font-semibold'>
                                            {item.phone_number}
                                        </td>
                                        :
                                        <td className='py-3 text-sm font-semibold text-[#2c76b6]'>
                                            chưa cập nhật
                                        </td>
                                    }
                                    <td
                                        onClick={() => handleViewProfile(item.id)}
                                        className='py-3 text-sm text-violet-400 hover:text-violet-700 cursor-pointer text-center font-semibold'>
                                        Xem
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>


            </table>
            <ModelProfile
                showModel={showProfile}
                onClose={handleCloseProfile}
                onDeleteStaff={onDeleteStaff}
                loading={loadingProfile}
                error={errorShowProfile} />
        </div>
    );
};

export default TableStaff;