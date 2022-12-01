import dayjs from 'dayjs';
import { Modal } from 'flowbite-react';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { getProfileUser } from '../../features/user_management/user_managementSlice';

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
interface typeProps {
    showModel: boolean,
    onClose: () => void,
    loading: boolean,
    error: string
}
const ModelProfile = (props: typeProps) => {
    const { loading, error, showModel, onClose } = props
    const profile: user = useAppSelector(getProfileUser)
    if (loading) {
        return (
            <Modal
                show={showModel}
                onClose={onClose}
                popup={true}
                size={'xl'}
                className='h-screen'
            >
                <Modal.Header className='ml-3 text-base'>
                    Hồ sơ người dùng

                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
            </Modal>
        )
    }
    else if (error || !profile) {
        return (
            <Modal
                show={showModel}
                onClose={onClose}
                popup={true}
                size={'xl'}
                className='h-screen'
            >
                <Modal.Header className='ml-3 text-base'>
                    Hồ sơ người dùng

                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>{error || 'Không lấy được dữ liệu'}</p>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
    return (
        <Modal
            show={showModel}
            onClose={onClose}
            popup={true}
            size={'xl'}
            className='h-screen'
        >
            <Modal.Header className='ml-3 text-base'>
                Hồ sơ người dùng {profile.name.split(' ').slice(-1).join(' ')}
            </Modal.Header>
            <Modal.Body>
                <div className='h-[500px] md:h-[300px]'>
                    <div className='flex justify-center'>
                        <div className="avatar w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full drop-shadow-md">
                            <img
                                className='w-full h-full rounded-full object-cover'
                                src={profile.current_avatar} alt="user" />
                        </div>
                    </div>
                    <div>
                        <p className='font-bold text-lg  text-center mt-2'>
                            {profile.name}
                        </p>
                        <div className="info">
                            <div className="phone_number flex items-center">
                                <p className='w-32 font-semibold'>Email</p>
                                {
                                    profile.email ?
                                        <p>{profile.email}</p>
                                        :
                                        <p className='text-blue-500'>Chưa cập nhật</p>
                                }

                            </div>
                            <div className="phone_number flex items-center">
                                <p className='w-32 font-semibold'>Số điện thoại</p>
                                {
                                    profile.phone_number ?
                                        <p>{profile.phone_number}</p>
                                        :
                                        <p className='text-blue-500'>Chưa cập nhật</p>
                                }
                            </div>
                            <div className="address flex items-center">
                                <p className='w-32 font-semibold'>Địa chỉ</p>
                                {
                                    profile.address ?
                                        <p>{profile.address}</p>
                                        :
                                        <p className='text-blue-500'>Chưa cập nhật</p>
                                }
                            </div>
                            <div className="created_at flex items-center">
                                <p className='w-32 font-semibold'>Ngày tham gia</p>
                                <p>{dayjs(profile.created_at).format('DD/MM/YYYY hh:mm:ss')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModelProfile;