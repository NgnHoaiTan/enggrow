import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import SearchUser from '../components/management_user/SearchUser';
import StatisticUser from '../components/management_user/StatisticUser';
import TableUsers from '../components/management_user/TableUsers';
import { getCurrentToken } from '../features/authentication/authSlice';
import { asyncGetListPaginationUsers } from '../features/user_management/user_managementApis';
import { getListPaginationUsers } from '../features/user_management/user_managementSlice';

const UsersManagement = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [loadingUsers, setLoadingUsers] = useState(true)
    const [errorLoadUsers, setErrorLoadUsers] = useState('')
    const users = useAppSelector(getListPaginationUsers)
    const accessToken = useAppSelector(getCurrentToken)
    const dispatch = useDispatch<AppDispatch>()
    const page = parseInt(searchParams.get('page') || '1')

    useEffect(() => {
        const action = async () => {
            try {
                const dataGet = {
                    query: {
                        take: 20,
                        page: page
                    },
                    accessToken: accessToken
                }
                await dispatch(asyncGetListPaginationUsers(dataGet)).unwrap()
            } catch (error: any) {
                if (error.message) {
                    setErrorLoadUsers(error.message)
                } else {
                    setErrorLoadUsers('Lỗi không xác định khi lấy dữ liệu danh sách người dùng')
                }
            }
        }
        action()
    }, [page])

    return (
        <div className='p-2'>
            <h2 className='font-bold text-xl mb-8'>Quản lý người dùng</h2>
            <div>
                <SearchUser />
            </div>
            {
                users ?
                    <TableUsers listusers={users} />
                    :
                    <div>
                        <p></p>
                    </div>
            }

        </div>
    );
};

export default UsersManagement;