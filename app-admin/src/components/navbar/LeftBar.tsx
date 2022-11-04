import React, { ReactElement } from 'react';
import { MdDashboard} from 'react-icons/md';
import { FaChartBar, FaUserTie, FaUser } from 'react-icons/fa';
import { SiGooglemeet } from 'react-icons/si';
import { BsFillArrowLeftCircleFill} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import {iconWebsite} from '../../common/Image'
// import logo from '../../images/logowebsite.png'
interface nav {
    url: string,
    icon: ReactElement<any>,
    name: string
}
const listNav: nav[] = [
    {
        url: '/',
        icon: <MdDashboard size="100%" color='inherit' />,
        name: "Dashboard"
    },
    {
        url: '/statistic',
        icon: <FaChartBar size="100%" color='inherit' />,
        name: "Statistic"
    },
    {
        url: '/management/courses',
        icon: <SiGooglemeet size="100%" color='inherit' />,
        name: "Courses"
    },

    {
        url: '/management/staffs',
        icon: <FaUserTie size="100%" color='inherit' />,
        name: "Staffs"
    },
    {
        url: '/management/users',
        icon: <FaUser size="100%" color='inherit' />,
        name: "Users"
    },
]
const LeftBar = (props: any) => {
    return (
        <div className='lg:fixed lg:z-50'>
            <div className={`left-bar ${props.show ? 'left-0' : ' -left-full'} ease-in-out duration-1000 fixed z-40 lg:hidden  bg-white border-r-2 h-screen`}>
                <div className={`lg:hidden absolute z-50 top-0 translate-y-1/2 right-0 ${props.show ? 'translate-x-1/2' : 'translate-x-1'}`}>
                    {
                        props.show &&
                        <BsFillArrowLeftCircleFill onClick={props.handleCloseLeftBar} size="25px" color="#6363e0" />
                    }

                </div>
                <div className="brand py-3 mb-2 flex items-center justify-center">
                    <div className="logo">
                        <img src={iconWebsite} className='w-14 mr-2' alt='logo' />
                    </div>
                    <div className="name">
                        <h1 className='font-bold text-lg'>EngGrow</h1>
                        <h2 className='text-sm font-semibold'>Administration</h2>
                    </div>

                </div>
                <div className="list-nav ">
                    <ul className='m-0 px-3'>
                        {
                            listNav.map((item, index) => {
                                return (
                                    <li key={index} className="my-3">
                                        <Link to={item.url} className='flex text-lg font-semibold items-center py-3 px-14 rounded-xl duration-75 ease-in hover:text-white hover:bg-blue-500'>
                                            <div className='w-[18px] mr-4'>
                                                {item.icon}
                                            </div>
                                            <p className='min-w-max'>
                                                {item.name}
                                            </p>

                                        </Link >
                                    </li>
                                )
                            })
                        }


                    </ul>
                </div>
            </div>
            <div className={`left-bar hidden lg:block lg:relative   bg-white border-r-2 h-screen`}>
                <div className={`lg:hidden absolute z-50 top-0 translate-y-1/2 right-0 ${props.show ? 'translate-x-1/2' : 'translate-x-1'}`}>
                    {
                        props.show &&
                        <BsFillArrowLeftCircleFill onClick={props.handleCloseLeftBar} size="25px" color="#6363e0" />
                    }

                </div>
                <div className="brand py-3 mb-2 flex items-center justify-center">
                    <div className="logo">
                        <img src={iconWebsite} className='w-14 mr-2' alt='logo' />
                    </div>
                    <div className="name">
                        <h1 className='font-bold text-lg'>EngGrow</h1>
                        <h2 className='text-sm font-semibold'>Administration</h2>
                    </div>

                </div>
                <div className="list-nav ">
                    <ul className='m-0 px-3'>
                        {
                            listNav.map((item, index) => {
                                return (
                                    <li key={index} className="my-3">
                                        <a href={item.url} className='flex text-lg font-semibold items-center py-3 px-10 rounded-xl duration-75 ease-in hover:text-white hover:bg-blue-500'>
                                            <div className='w-[18px] mr-4'>
                                                {item.icon}
                                            </div>
                                            <p className='min-w-max'>
                                                {item.name}
                                            </p>

                                        </a>
                                    </li>
                                )
                            })
                        }


                    </ul>
                </div>
            </div>
        </div>

    );
};

export default LeftBar;