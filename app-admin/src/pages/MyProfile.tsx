import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import BaseInfomation from '../components/profile/BaseInfomation';
import ModelCreateStaffInfo from '../components/profile/ModelCreateStaffInfo';
import StaffProfile from '../components/profile/StaffProfile';
import { getCurrentToken } from '../features/authentication/authSlice';
import { asyncGetMyAlbumAvatar, asyncGetMyProfile } from '../features/profile/profileApis';
import { getMyProfile } from '../features/profile/profileSlice';

const MyProfile = () => {
    const [loadingProfile, setLoadingProfile] = useState(true)
    const [errorLoadProfile, setErrorLoadProfile] = useState('')
    const [showModelCreate, setShowModelCreate] = useState(false)
    const accessToken = useAppSelector(getCurrentToken)
    const profile = useAppSelector(getMyProfile)
    const { userId } = useParams()
    const dispatch = useDispatch<AppDispatch>()

    const handleOpenModelCreate = () => {
        setShowModelCreate(true)
    }
    const handleCloseModelCreate = () => {
        setShowModelCreate(false)
    }

    useEffect(() => {
        const action = async () => {
            try {
                setLoadingProfile(() => true)
                let dataSubmit = {
                    accessToken: accessToken
                }
                await dispatch(asyncGetMyProfile(dataSubmit)).unwrap()
                await dispatch(asyncGetMyAlbumAvatar(accessToken)).unwrap()
            } catch (error: any) {

                if (error.message) {
                    setErrorLoadProfile(error.message)
                }
                else {
                    setErrorLoadProfile('Lỗi không xác định xảy ra khi tải dữ liệu thông tin cá nhân')
                }
            }
        }
        action()
        setLoadingProfile(() => false)
    }, [])
    if (loadingProfile) {
        return (
            <div>

            </div>
        )
    }
    else if (errorLoadProfile) {
        return (
            <div>
                <p className='text-red-500 font-bold md:text-lg mt-10 text-center'>{errorLoadProfile}</p>
            </div>
        )
    }
    return (
        <div className='px-5 sm:px-8 md:px-20'>
            <BaseInfomation
                loading={loadingProfile}
                error={errorLoadProfile}
                profile={profile}
            />
            <div className='mt-5 h-[1px] w-full bg-violet-500 blur-[1px] opacity-80'>

            </div>

            {
                profile.staff_profile ?
                    <StaffProfile staff_profile={profile.staff_profile} />
                    :
                    <React.Fragment>
                        <div className='mt-5'>
                            <p className='font-bold text-orange-400 text-center md:text-lg'>Thông tin nhân viên của bạn hiện đang thiếu, vui lòng bổ sung ngay</p>
                            <div className="flex justify-center mt-5">
                                <button
                                    onClick={handleOpenModelCreate}
                                    className='px-5 py-2  bg-blue-500 text-white font-semibold rounded-xl'>
                                    Thêm thông tin nhân viên bản thân
                                </button>
                            </div>

                            <ModelCreateStaffInfo showModel={showModelCreate} onClose={handleCloseModelCreate} />
                        </div>
                    </React.Fragment>
            }


        </div>
    );
};

export default MyProfile;