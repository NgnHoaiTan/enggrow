import React from 'react';
import { IoNotificationsCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import robotface from '../../images/robot-remind.png'
import robotfloat from '../../images/robot2.png'
const RemindPractice = () => {
    return (
        <div className=''>
            <div className="toast-message bg-[#548d5d] rounded-xl p-3 sm:p-4 md:p-5 flex items-center">
                <div className='mr-3 w-12'>
                    <img src={robotface} className='w-16 animate-floating ' />
                    {/* <div>
                        <IoNotificationsCircleOutline color='white' size="40px" />
                    </div> */}
                </div>
                <div>
                    <div className="title">
                        <p className='text-xl text-white font-semibold'>Hi there</p>
                    </div>
                    <div className="content">
                        <p className='text-white text-base'>You have some flashcard you need to learn</p>
                        <p className='text-white text-base font-semibold'>
                            <Link to={'/folders'}>
                                Check it
                            </Link>
                        </p>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default RemindPractice;