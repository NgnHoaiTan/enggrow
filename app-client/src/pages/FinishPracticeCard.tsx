import React from 'react';
import FinishNotification from '../components/practiceFlashcard/FinishNotification';

const FinishPracticeCard = () => {
    return (
        <div>
            <div className="top-nav-practice">
                <div className="bg-white w-full h-14 drop-shadow-md">

                </div>
            </div>
            <div className='bg-white p-3 md:py-10 w-full h-screen'>
                <FinishNotification />
            </div>
        </div>
    );
};

export default FinishPracticeCard;