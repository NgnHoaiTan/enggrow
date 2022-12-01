import dayjs from 'dayjs';
import React, { useState } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import ModelChangeAvatar from './ModelChangeAvatar';
import ModelUpdateBaseInfo from './ModelUpdateBaseInfo';

interface typeProps {
    loading: boolean,
    error: string,
    profile: any
}
const BaseInfomation = (props: typeProps) => {
    const { profile, loading, error } = props
    const [showChangeAvatar, setShowChangeAvatar] = useState(false)
    const [showModelUpdate, setShowModelUpdate] = useState(false)
    const [showModelChangeAvatar, setShowModelChangeAvatar] = useState(false)
    const handleOpenModelUpdate = () => {
        setShowModelUpdate(true)
    }
    const handleCloseModelUpdate = () => {
        setShowModelUpdate(false)
    }
    const handleOpenModelChangeAvatar = () => {
        setShowModelChangeAvatar(true)
    }
    const handleCloseModelChangeAvatar=()=>{
        setShowModelChangeAvatar(false)
    }
    
   
    return (
        <div className='flex flex-col gap-5 md:gap-10 items-start mt-10 md:flex-row'>
            <div className="avatar mx-auto md:mx-0">
                <div 
                onMouseOver={()=>setShowChangeAvatar(true)}
                onMouseLeave={()=>setShowChangeAvatar(false)}
                
                className='relative'>
                    <img src={profile.current_avatar} alt="user"
                        className='object-cover bg-center w-28 h-28 sm:h-32 sm:w-32 md:w-36 md:h-36 xl:w-60 xl:h-60 rounded-md'
                    />
                    <div className={`${showChangeAvatar ? 'block' : 'hidden'}`}>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                            <div 
                            onClick={handleOpenModelChangeAvatar}
                            className='w-9 h-9 rounded-md p-2 bg-[#3f3f3f] flex justify-center'>
                                <BsFillCameraFill size='100%' color='white' className='' />
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div className="base-information w-full md:w-fit">
                <div className="name mb-5 mx-auto md:mx-0">
                    <p className='font-semibold text-2xl text-center md:text-left sm:text-3xl md:text-4xl'>{profile.name}</p>
                </div>
                <div className="phone_number flex items-center mb-2 gap-2">
                    <p className='font-bold md:text-lg'>Ngày sinh:</p>
                    <p className='font-semibold md:text-lg'>{dayjs(profile.dob).format('DD/MM/YYYY')}</p>
                </div>
                <div className="phone_number flex items-center mb-2 gap-2">
                    <p className='font-bold md:text-lg'>Số điện thoại:</p>
                    <p className='font-semibold md:text-lg'>{profile.phone_number}</p>
                </div>
                <div className="email flex items-center mb-2 gap-2">
                    <p className='font-bold md:text-lg'>Email:</p>
                    <p className='font-semibold md:text-lg'>{profile.email}</p>
                </div>
                <div className="address flex items-center mb-2 gap-2">
                    <p className='font-bold md:text-lg'>Địa chỉ:</p>
                    <p className='font-semibold md:text-lg'>{profile.address}</p>
                </div>
                <button 
                onClick={handleOpenModelUpdate}
                className='mt-5 py-2 px-5 rounded-lg text-white font-semibold bg-gradient-to-r from-[#5e2dbf] to-[#2c56bf]'>
                    Cập nhật thông tin
                </button>
            </div>
            <ModelUpdateBaseInfo 
                showModel={showModelUpdate}
                onClose={handleCloseModelUpdate}
                information={profile}
            />
            <ModelChangeAvatar
                showModel={showModelChangeAvatar}
                onClose={handleCloseModelChangeAvatar}
            />
        </div>
    );
};

export default BaseInfomation;