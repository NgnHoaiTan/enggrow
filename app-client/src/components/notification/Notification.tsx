import { Modal } from 'flowbite-react';
import React, { useState } from 'react';
import NotificationItem from './NotificationItem';

interface NotificationProps {
    openNotification: boolean
    handleClose: any
}
const Notification = (props:NotificationProps) => {
    const [tab, setTab] = useState(1)
    return (
        <div>
            <div className={`${props.openNotification ? 'block' : 'hidden'} bg-white max-h-[600px] overflow-y-auto py-4 shadow-card z-50 rounded-xl sm:w-[350px] md:w-[450px]`}>
                {/* .top content */}
                <div className='flex justify-between items-center mb-4 px-5 '>
                    <h3 className='font-semibold text-lg'>Notification</h3>
                    <p className='underline text-sm cursor-pointer'>Mark all as read</p>
                </div>

                <div className='relative'>
                    <div className="panel flex items-center px-5 border-b-[4px] pb-2">
                        <button onClick={() => setTab(1)} className={`${tab === 1 ? 'font-semibold' : ''} bg-transparent px-1 text-center `}>All</button>
                        <button onClick={() => setTab(2)} className={`${tab === 2 ? 'font-semibold' : ''} bg-transparent px-1 text-center mx-3`}>Following</button>
                        <button onClick={() => setTab(3)} className={`${tab === 3 ? 'font-semibold' : ''} bg-transparent px-1 text-center`}>Courses</button>
                    </div>
                    <div className=''>
                        <div className={`tab-1 py-4 ${tab === 1 ? 'block' : 'hidden'}`}>
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                        </div>
                        <div className={`tab-2 py-4 ${tab === 2 ? 'block' : 'hidden'}`}>
                            <NotificationItem />
                            <NotificationItem />
                        </div>
                        <div className={`tab-3 py-4 ${tab === 3 ? 'block' : 'hidden'}`}>
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                        </div>
                    </div>
                </div>

            </div>
            
        </div>

    );
};

export default Notification;