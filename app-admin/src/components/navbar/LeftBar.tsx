import React, { ReactElement, useEffect, useState } from 'react';
import { MdBackup, MdDashboard } from 'react-icons/md';
import { FaChartBar, FaUserTie, FaUser } from 'react-icons/fa';
import { SiGooglemeet } from 'react-icons/si';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { iconWebsite } from '../../common/Image'
import BackupModel from '../backup/BackupModel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector } from '../../app/hooks';
import { getCurrentUser } from '../../features/authentication/authSlice';


interface nav {
    url: string,
    icon: ReactElement<any>,
    name: string
}
const listNav: nav[] = [
    {
        url: '/',
        icon: <MdDashboard size="100%" color='inherit' />,
        name: "Trang chủ"
    },
    {
        url: '/statistic',
        icon: <FaChartBar size="100%" color='inherit' />,
        name: "Thống kê"
    },
    {
        url: '/management/courses',
        icon: <SiGooglemeet size="100%" color='inherit' />,
        name: "Quản lý khóa học"
    },

    {
        url: '/management/staffs',
        icon: <FaUserTie size="100%" color='inherit' />,
        name: "Quản lý nhân viên"
    },
    {
        url: '/management/users',
        icon: <FaUser size="100%" color='inherit' />,
        name: "Quản lý người dùng"
    },
]
const listNavForStaff: nav[] = [
    {
        url: '/',
        icon: <MdDashboard size="100%" color='inherit' />,
        name: "Trang chủ"
    },
    {
        url: '/statistic',
        icon: <FaChartBar size="100%" color='inherit' />,
        name: "Thống kê"
    },
    {
        url: '/management/courses',
        icon: <SiGooglemeet size="100%" color='inherit' />,
        name: "Quản lý khóa học"
    }
]


const LeftBar = (props: any) => {
    const [showModelBackup, setShowModelBackup] = useState(false)
    const [resultBackup, setResultBackup] = useState(false)
    const [actionBackup, setActionBackup] = useState(false)
    const [role, setRole] = useState({
        id: 0,
        name: ''
    })
    const user = useAppSelector(getCurrentUser)

    useEffect(() => {
        if (user && user.role) {
            setRole((prev) => ({
                ...prev,
                id: user.role.id,
                name: user.role.name
            }))
        }
    }, [user])
    const handleCloseBackup = () => {
        setShowModelBackup(false)
    }
    const notifyCorrect = (msg: string) => toast.success(msg)
    const notifyFalse = (msg: string) => toast.error(msg)

    useEffect(() => {
        if (resultBackup && actionBackup) {
            notifyCorrect('Sao lưu dữ liệu thành công')
        } else if (actionBackup && !resultBackup) {
            notifyFalse('Sao lưu dữ liệu thất bại, thử lại sau')
        }
    }, [resultBackup, actionBackup])
    return (
        <div className='lg:fixed lg:z-50 relative'>

            <div>
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
                            <h2 className='text-sm font-semibold'>Quản lý và điều hành</h2>
                        </div>

                    </div>
                    <div className="list-nav">
                        {
                            role.id === 1 ?
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
                                :
                                <React.Fragment>
                                    {
                                        role.id === 2 ?
                                            <React.Fragment>
                                                <ul className='m-0 px-3'>
                                                    {
                                                        listNavForStaff.map((item, index) => {
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
                                            </React.Fragment>
                                            :
                                            <>
                                            </>
                                    }
                                </React.Fragment>

                        }

                    </div>
                    {
                        role.id === 1 &&
                        <div className="backup absolute bottom-0 z-50 -translate-y-5 left-1/2 -translate-x-1/2">
                            <div className='w-full'>
                                <button
                                    onClick={() => setShowModelBackup(true)}
                                    className='flex items-center gap-2 rounded-lg bg-gray-200
                            text-[#3f3f3f] font-semibold py-2 px-3 w-[160px] text-center justify-center
                        '>
                                    <MdBackup size={'20px'} />
                                    Sao lưu dữ liệu
                                </button>
                                <BackupModel
                                    onSetResult={setResultBackup}
                                    onActionBackup={setActionBackup}
                                    showModel={showModelBackup}
                                    onClose={handleCloseBackup}
                                />
                            </div>

                        </div>
                    }

                </div>
                <div className={`left-bar hidden lg:block lg:relative   bg-white border-r-2 h-screen`}>
                    <div className={`lg:hidden absolute z-50 top-0 translate-y-1/2 right-0 ${props.show ? 'translate-x-1/2' : 'translate-x-1'}`}>
                        {
                            props.show &&
                            <BsFillArrowLeftCircleFill onClick={props.handleCloseLeftBar} size="25px" color="#6363e0" />
                        }

                    </div>
                    <div>
                        <div className="brand py-3 mb-2 flex items-center justify-center min-w-[226px]">
                            <div className="logo">
                                <img src={iconWebsite} className='w-14 mr-2' alt='logo' />
                            </div>
                            <div className="name">
                                <h1 className='font-bold text-lg'>EngGrow</h1>
                                <h2 className='text-sm font-semibold'>Quản lý và điều hành</h2>
                            </div>

                        </div>
                        <div className="list-nav">

                            {
                                role.id === 1 ?
                                    <ul className='m-0'>
                                        {
                                            listNav.map((item, index) => {
                                                return (
                                                    <li key={index} className="my-3">
                                                        <a href={item.url} className='flex font-semibold items-center py-3 px-5 duration-75 ease-in hover:text-white hover:bg-blue-500'>
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
                                    :
                                    <React.Fragment>
                                        {
                                            role.id === 2 ?
                                                <ul className='m-0'>
                                                    {
                                                        listNavForStaff.map((item, index) => {
                                                            return (
                                                                <li key={index} className="my-3">
                                                                    <a href={item.url} className='flex font-semibold items-center py-3 px-5 duration-75 ease-in hover:text-white hover:bg-blue-500'>
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
                                                :
                                                <>
                                                </>
                                        }
                                    </React.Fragment>

                            }
                        </div>
                    </div>
                    {
                        role.id === 1 &&
                        <div className="backup absolute bottom-0 z-50 -translate-y-5 left-1/2 -translate-x-1/2">
                            <div className='w-full'>
                                <button
                                    onClick={() => setShowModelBackup(true)}
                                    className='flex items-center gap-2 rounded-lg bg-gray-200
                            text-[#3f3f3f] font-semibold py-2 px-3 w-[160px] text-center justify-center
                        '>
                                    <MdBackup size={'20px'} />
                                    Sao lưu dữ liệu
                                </button>
                                <BackupModel
                                    onSetResult={setResultBackup}
                                    onActionBackup={setActionBackup}
                                    showModel={showModelBackup}
                                    onClose={handleCloseBackup}
                                />
                            </div>

                        </div>
                    }


                </div>

            </div>
            <ToastContainer
                position="top-right"
                autoClose={4000}
            />
        </div>

    );
};

export default LeftBar;