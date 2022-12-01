import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { asyncGetInfoUserById } from '../../features/user_management/user_managementApis';
import ModelProfile from './ModelProfile';
import PaginationUser from './PaginationUser';


interface user {
    id: number,
    username: string,
    name: string,
    current_avatar: string,
    email: string,
    address: string,
    phone_number: string,
    dob: string,
    created_at: string
}
interface dataPagination {
    data: user[],
    count: number,
    currentPage: number,
    nextPage: number | null,
    prevPage: number | null,
    lastPage: number,
    firstPage: number
}
interface typeProps {
    listusers: dataPagination
}
const TableUsers = (props: typeProps) => {
    const { listusers } = props
    const [loadingProfile, setLoadingProfile] = useState(true)
    const [errorShowProfile, setErrorShowProfile] = useState('')
    const [showProfile, setShowProfile] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)
    const handleCloseProfile = () => {
        setShowProfile(false)
    }

    const handleViewProfile = async (userId: number) => {
        try {
            setErrorShowProfile('')
            setLoadingProfile(() => true)
            let dataSubmit = {
                userId: userId,
                accessToken: accessToken
            }
            await dispatch(asyncGetInfoUserById(dataSubmit)).unwrap()
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
    return (
        <div className='w-full rounded-xl drop-shadow-md overflow-hidden mb-5'>
            <table className='bg-white w-full '>
                <thead>
                    <tr className='bg-[#545454] text-white'>
                        <th className='py-2 px-2 text-sm'>#</th>
                        <th className='py-2 text-sm text-left'>Họ tên</th>
                        <th className='py-2 text-sm text-left'>Tài khoản</th>
                        <th className='py-2 text-sm text-left'>Ngày tham gia</th>
                        <th className='py-2 text-sm text-left'>Email</th>
                        <th className='py-2 text-sm text-left'>Số điện thoại</th>
                        <th className='py-2 text-sm'>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listusers.data.map((user: user, index: number) => {
                            return (
                                <tr key={user.id} className='even:bg-[#ececec]'>
                                    <td className='px-2 py-3 text-sm font-semibold text-center'>
                                        {index + 1}
                                    </td>
                                    <td className='py-3 text-sm font-semibold flex items-center gap-3'>
                                        <div className='w-7 h-7 rounded-full'>
                                            <img src={user.current_avatar} alt="avatar"
                                                className='w-full object-cover rounded-full'
                                            />
                                        </div>
                                        {user.name}
                                    </td>
                                    <td className='py-3 text-sm font-semibold'>
                                        {user.username}
                                    </td>
                                    <td className='py-3 text-sm font-semibold'>
                                        {dayjs(user.dob).format('DD/MM/YYYY')}
                                    </td>
                                    <td className='py-3 text-sm font-semibold'>
                                        {user.email ?
                                            <p>
                                                {user.email}
                                            </p>
                                            :
                                            <p className='text-blue-500'>
                                                trống
                                            </p>
                                        }
                                    </td>
                                    <td className='py-3 text-sm font-semibold'>
                                        {user.phone_number ?
                                            <p>
                                                {user.phone_number}
                                            </p>
                                            :
                                            <p className='text-blue-500'>
                                                trống
                                            </p>
                                        }
                                    </td>
                                    <td
                                        className=''>
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => handleViewProfile(user.id)}
                                                className='text-sm text-violet-400 rounded-xl hover:text-violet-900 hover:bg-white hover:drop-shadow-md p-1 text-center font-semibold'
                                            >
                                                Xem thông tin
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr className='bg-[#545454]'>
                        <td colSpan={7} className="text-white py-2 px-10 text-sm text-right">
                            <PaginationUser listusers={listusers} />
                        </td>
                    </tr>
                </tfoot>

            </table>
            <ModelProfile
                showModel={showProfile}
                onClose={handleCloseProfile}
                loading={loadingProfile}
                error={errorShowProfile}
            />
        </div>
    );
};

export default TableUsers;