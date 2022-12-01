import React, { useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { BsCameraFill } from 'react-icons/bs';
import { useAppSelector } from '../../app/hooks';
import { getCurrentUser } from '../../features/authentication/authSlice';
import demouser from '../../images/demouser.jpg'
import ModelChangeAvatar from './ModelChangeAvatar';
import ModelInfo from './ModelInfo';

interface user {
    id: number,
    name: string,
    dob: string,
    current_avatar: string,
    email: string,
    phone_number: string,
    address: string
}
interface typeProps {
    user: user
}
const UserProfile = (props: typeProps) => {
    const { user } = props
    const [showModelChangeAvatar, setShowModelChangeAvatar] = useState(false)
    const [showModelInfo, setShowModelInfo] = useState(false)
    const handleCloseModelInfo = () => {
        setShowModelInfo(false)
    }
    const handleOpenModelChangeAvatar = () => {
        setShowModelChangeAvatar(true)
    }
    const handleCloseModelChangeAvatar = () => {
        setShowModelChangeAvatar(false)
    }
    return (
        <div className='user-profile'>
            <div className="flex flex-col mt-3 sm:mt-5 items-center justify-start gap-3">
                <div className="avatar">
                    <div
                        onClick={() => setShowModelChangeAvatar(true)}
                        className='relative cursor-pointer w-32 h-32 sm:w-36 sm:h-36 md:w-52 md:h-52'>
                        <img src={user.current_avatar} alt="user" className='w-full h-full rounded-full object-cover' />
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -translate-y-1/2">
                            <div className='w-7 h-7 bg-white p-1 rounded-full drop-shadow-lg'>
                                <BsCameraFill size={'100%'} />
                            </div>

                        </div>
                    </div>
                    <ModelChangeAvatar
                        showModel={showModelChangeAvatar}
                        onClose={handleCloseModelChangeAvatar}
                    />
                </div>
                <div className="base-information flex flex-col gap-2">
                    <div className="name">
                        <p className='font-bold text-2xl md:text-3xl text-center'>
                            {user.name}
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModelInfo(true)}
                        className='font-semibold text-center text-lg text-violet-500 bg-white drop-shadow-lg py-1 px-5 rounded-lg'>
                        Thông tin cá nhân
                    </button>
                    <ModelInfo
                        showModel={showModelInfo}
                        onClose={handleCloseModelInfo}
                        information={user}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;