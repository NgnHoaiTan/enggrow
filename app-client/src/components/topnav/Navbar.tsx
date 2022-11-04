import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdNotifications } from 'react-icons/io'
import { MdClose } from 'react-icons/md'
import { useNavigate } from 'react-router';
import logo from '../../images/logo.png'
import Notification from '../notification/Notification';
interface Nav {
    name: string,
    url: string
}

const listNav: Nav[] = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'Albums',
        url: '/folders'
    },
    {
        name: 'Courses',
        url: '/courses'
    },
    {
        name: 'Explore',
        url: '/explore'
    },
]

const Navbar = () => {
    const navigate = useNavigate()
    const [openNav, setOpenNav] = useState(false)
    const [openNotification, setOpenNotification] = useState(false)
    const handleClickOpenNav = () => {
        setOpenNav(!openNav)
    }
    const handleCloseNotification = () =>{
        setOpenNotification(false)
    }
    return (

        <nav className='bg-navbar fixed top-0 w-full z-50 shadow'>
            <div className='flex items-center justify-between relative py-2 px-5 md:px-10'>
                <div className={`${openNotification ? 'block' : 'hidden'} sm:hidden absolute top-16 px-3 left-1/2 -translate-x-1/2 w-full h-screen`}>
                    <Notification openNotification={openNotification} handleClose={handleCloseNotification} />
                </div>
                <div id='left-nav' className='flex justify-between items-center'>
                    <div className='flex items-center'>
                        <div>
                            <img src={logo} className="w-10 md:w-12" alt="logo" />
                        </div>

                        <p className='text-[#393939] ml-2 font-bold text-lg'>EngGrow</p>
                    </div>
                    <ul className='hidden ml-10 md:flex text-[#393939] '>
                        {
                            listNav.map((item, index) => {
                                return (
                                    <li key={index} className='font-medium text-center m-1'>
                                        <a href={item.url} className='#393939 text-lg text-center no-underline hover:bg-[#5896B9] p-2 hover:text-white rounded-xl ease-in-out duration-200'>{item.name}</a>
                                    </li>
                                )

                            })
                        }
                    </ul>
                </div>
                <div className='flex items-center justify-evenly'>
                    {/* notification */}
                    <div className='relative mr-2'>
                        <div onClick={() => setOpenNotification(!openNotification)} className='cursor-pointer flex items-center justify-center w-12 h-8 rounded-2xl bg-blue-500 text-white'>
                            <IoMdNotifications color='#ffffff' size='20px' className='mr-1 animate-wiggle' />
                            <p className='font-semibold text-sm'>5</p>
                        </div>
                        {/* notification popup */}
                        <div className={`hidden sm:${openNotification ? 'block' : 'hidden'} absolute top-full sm:-left-[300px] md:-left-[400px] mt-2`}>
                            <Notification openNotification={openNotification} handleClose={handleCloseNotification}/>
                        </div>

                    </div>

                    <img onClick={()=>navigate('/profile/id')} className='cursor-pointer rounded-full w-7 h-7 md:w-10 md:h-10 align-middle object-cover mx-2' src="https://img.freepik.com/premium-photo/oh-my-god-portrait-astonished-handsome-man-denim-casual-shirt-looking-camera-with-big-amazed-eyes-saying-wow-shocked-by-unbelievable-news-indoor-studio-shot-isolated-yellow-background_416530-21128.jpg?w=2000" alt='avatar user' />
                    <div className='inline-block md:hidden'>
                        {
                            openNav ?
                                <MdClose onClick={handleClickOpenNav} color='#393939' size='20px' className='z-4' />
                                :
                                <GiHamburgerMenu onClick={handleClickOpenNav} color='#393939' size='20px' className='z-4' />
                        }
                    </div>


                </div>
                <div id='nav-mobile' className={`md:hidden block overflow-hidden ${openNav ? 'right-0 opacity-100' : '-right-full opacity-0'} ease-in-out duration-300 bg-[#6d71e4] h-screen w-3/4 absolute top-14`}>
                    <ul className='flex flex-col'>
                        {
                            listNav.map((item, index) => {
                                return (
                                    <li key={index} className='font-medium text-left w-full'>
                                        <a href={item.url} className='block #393939 text-lg no-underline hover:bg-[#ffffff] hover:text-[#393939] py-2 px-4 text-white'>{item.name}</a>
                                    </li>
                                )

                            })
                        }
                    </ul>
                </div>
            </div>



        </nav>
    );
};

export default Navbar;