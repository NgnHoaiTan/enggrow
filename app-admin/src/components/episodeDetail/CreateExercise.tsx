import React, { useState } from 'react';
import IdenExCreateModel from './IdenExCreateModel';
import PronunExCreateModel from './PronunExCreateModel';

const CreateExercise = () => {
    const [showFormCreatePronunEx, setShowFormCreatePronunEx] = useState(false)
    const [showFormCreateIdenEx,setShowFormCreateIdenEx] = useState(false)
    // function
    const handleCloseFormCreatePronunEx = () => {
        setShowFormCreatePronunEx(false)
    }
    const handleCloseFormCreateIdenEx = () => {
        setShowFormCreateIdenEx(false)
    }

    return (
        <div className='my-5'>
            <div className="flex">
                <div>
                    <button
                        onClick={() => setShowFormCreatePronunEx(true)}
                        className='px-3 md:px-4 py-2 md:py-3 text-sm  rounded-lg font-semibold text-white bg-blue-500'>
                        New Pronunciation exercise
                    </button>
                    <PronunExCreateModel showFormCreate={showFormCreatePronunEx} onClose={handleCloseFormCreatePronunEx} />
                </div>
                <div className='ml-3'>
                    <button
                        onClick={() => setShowFormCreateIdenEx(true)}
                        className='px-3 md:px-4 py-2 md:py-3 text-sm rounded-lg font-semibold text-white bg-blue-500'>
                        New Identification exercise
                    </button>
                    <IdenExCreateModel showFormCreate={showFormCreateIdenEx} onClose={handleCloseFormCreateIdenEx} />
                </div>
            </div>

        </div>
    );
};

export default CreateExercise;