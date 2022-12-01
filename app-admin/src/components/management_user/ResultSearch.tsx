import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { asyncGetInfoUserById, asyncSearchPaginationUsers } from '../../features/user_management/user_managementApis';
import { searchPaginationUsers } from '../../features/user_management/user_managementSlice';
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
const ResultSearch = () => {
    const searchResults: dataPagination = useAppSelector(searchPaginationUsers)
    const [searchParams, setSearchParams] = useSearchParams();
    const [loadingUsers, setLoadingUsers] = useState(true)
    const [errorLoadUsers, setErrorLoadUsers] = useState('')
    const dispatch = useDispatch<AppDispatch>()
    const page = parseInt(searchParams.get('page') || '1')
    const name = searchParams.get('name')
    const accessToken = useAppSelector(getCurrentToken)
    const navigate = useNavigate()
    const [loadingProfile, setLoadingProfile] = useState(true)
    const [errorShowProfile, setErrorShowProfile] = useState('')
    const [showProfile, setShowProfile] = useState(false)


    useEffect(() => {
        const action = async () => {
            try {
                setErrorLoadUsers('')
                setLoadingUsers(() => true)
                const dataGet = {
                    query: {
                        name: name,
                        page: page
                    },
                    accessToken: accessToken
                }
                await dispatch(asyncSearchPaginationUsers(dataGet)).unwrap()
            } catch (error: any) {
                if (error.message) {
                    setErrorLoadUsers(error.message)
                } else {
                    setErrorLoadUsers('Lỗi không xác định khi lấy dữ liệu danh sách người dùng')
                }
            }
        }
        action()
        setLoadingUsers(() => false)
    }, [page, name])

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


    if (loadingUsers) {
        return (
            <div>

            </div>
        )
    }
    else if (errorLoadUsers || !searchResults) {
        return (
            <div className='my-5'>
                <p className='text-red-500 font-semibold text-center'>Lỗi xảy ra trong quá trình tìm kiếm người dùng</p>
            </div>
        )
    }
    else if (searchResults.data.length == 0) {
        return (
            <div>
                <h2 className='font-bold text-xl mb-8'>Kết quả tìm kiếm</h2>
                <div className="list-result">

                    <p className='font-semibold text-center'>Không tìm thấy người dùng</p>
                    <div className='flex justify-center my-4'>
                        <button onClick={() => navigate(-1)} className='bg-gray-200 p-2 rounded-xl'>Trở về</button>
                    </div>

                </div>
            </div>
        )
    }
    return (

        <div>
            <h2 className='font-bold text-xl mb-8'>Kết quả tìm kiếm</h2>
            <div className="list-result">
                {
                    searchResults.data ?
                        <div>
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
                                        searchResults.data.map((user: user, index: number) => {
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
                                                    >
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
                                            <PaginationUser
                                                listusers={searchResults}
                                            />
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
                        :
                        <div className='my-5'>
                            <p className='text-center font-semibold text-lg'>Danh sách người dùng trống</p>
                        </div>
                }
            </div>
        </div>
    );
};

export default ResultSearch;