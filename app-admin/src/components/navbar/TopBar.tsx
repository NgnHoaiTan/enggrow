import React from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { FaAngleDown } from 'react-icons/fa'
import { IoNotificationsOutline } from 'react-icons/io5'

const TopBar = (props: any) => {

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
                    <div className="notification">
                        <div className='w-7 mr-4'>
                            <IoNotificationsOutline size="100%" color='#3d3d3d' className='' />
                        </div>

                    </div>
                    <div className="user-part flex flex-row items-center bg-gray-100 rounded-md md:py-1 md:px-2">
                        <div className="avatar">
                            <img className='w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover md:mr-3'
                                alt='avatar of user'
                                src='https://cdn.dribbble.com/users/3245638/screenshots/15628559/media/21f20574f74b6d6f8e74f92bde7de2fd.png?compress=1&resize=400x300&vertical=top' />
                        </div>
                        <div className="hidden md:flex items-center flex-wrap cursor-pointer">
                            <p className='font-semibold'>Nguyen Hoai Tan</p>
                            <FaAngleDown size="15px" className='ml-1' />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default TopBar;