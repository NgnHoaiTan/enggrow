import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/hooks';
import { AppDispatch } from './app/store';
import RemindPractice from './components/remind/RemindPractice';
import Navbar from './components/topnav/Navbar';
import { getRemindPractice, resetRemind } from './features/folder/folderSlice';
import Home from './pages/Home';

const Layout = (props: any) => {
    const [showRemind, setShowRemind] = useState(false)
    const remindPractice = useAppSelector(getRemindPractice)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        if (remindPractice) {
            const timeout = setTimeout(()=>{
                setShowRemind(()=>true)
            },2000)
            // return clearTimeout(timeout)
        }
       
    }, [remindPractice])
    const handleCloseRemind=()=>{
        setShowRemind(false)
    }
    return (
        <div className='relative'>
            <Navbar />
            {props.page}

            <div className="fixed w-full px-2 sm:w-auto sm:px-0 bottom-0 right-0 sm:right-5 -translate-y-1/2 ">
                <div className={`${showRemind ? 'animate-showRemind block' : 'opacity-0 duration-1000'}`}>
                    <RemindPractice 
                        onClose={handleCloseRemind}
                        showModel={showRemind}
                        listRemind={remindPractice}
                    />
                </div>

            </div>
        </div>
    );
};

export default Layout;