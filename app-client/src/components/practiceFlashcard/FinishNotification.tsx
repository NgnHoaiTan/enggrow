import React from 'react';
import { useNavigate, useParams } from 'react-router';
import robot from '../../images/robot2.png'
const FinishNotification = () => {
    const navigate = useNavigate()
    const {folderId} = useParams()
    return (
        <div className='flex flex-col items-center'>
            <div className="img w-[200px] mx-auto">
                <img src={robot} alt='robot' className='w-full animate-floating'/>
            </div>
            <p className='font-semibold text-xl mt-3'>
                You finished flashcards of this folder
            </p>
            <button 
            onClick={()=>navigate(`/folders/flashcard/${folderId}`)}
            className='mt-5 px-4 py-2 rounded-lg bg-violet-600 text-white cursor-pointer font-semibold'>
                Next
            </button>
        </div>
    );
};

export default FinishNotification;