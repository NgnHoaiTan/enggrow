import React from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { FaAngleDown } from 'react-icons/fa'
import { IoNotificationsOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { getCurrentUser } from '../../features/authentication/authSlice';

const TopBar = (props: any) => {
    const navigate = useNavigate()
    const user = useAppSelector(getCurrentUser)
    return (
        <div className='w-full'>
            <div className=' bg-gray-100 lg:bg-white lg:drop-shadow-md p-2 rounded-md  flex flex-row items-center justify-between relative'>
                <div className="toggle-leftbar w-10">

                    <div className={`lg:hidden absolute top-1/2 -translate-y-1/2 left-0 ${props.showLeftBar ? 'hidden' : 'translate-x-1'}`}>
                        {
                            !props.show &&
                            <BsFillArrowRightCircleFill onClick={props.handleOpenLeftBar} size="25px" color="#6363e0" />
                        }

                    </div>
                </div>
                <div className="notifi-user flex items-center">
                    {/* <div className="notification">
                        <div className='w-7 mr-4'>
                            <IoNotificationsOutline size="100%" color='#3d3d3d' className='' />
                        </div>

                    </div> */}
                    <div 
                    onClick={()=>navigate(`/profile/${user.id}`)}
                    className="user-part flex flex-row items-center bg-transparent rounded-md md:py-1 md:px-2">
                        <div className="avatar">
                            <img className='w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover md:mr-3'
                                alt='avatar of user'
                                src={user.current_avatar} />
                        </div>
                        <div className="hidden md:flex items-center flex-wrap cursor-pointer">
                            <p className='font-semibold'>
                                {user.name}
                            </p>
                            {/* <FaAngleDown size="15px" className='ml-1' /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default TopBar;