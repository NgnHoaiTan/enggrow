import React, { useState } from 'react';
import CreateModel from './CreateModel';

const CreateExercise = () => {
    const [showFormCreate, setShowFormCreate] = useState(false)

    // function
    const handleCloseFormCreate = () => {
        setShowFormCreate(false)
    }
    
    return (
        <div className='my-5'>
            <button
                onClick={() => setShowFormCreate(true)}
                className='px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg font-semibold text-white bg-blue-500'>
                New exercise
            </button>
            <CreateModel showFormCreate={showFormCreate} onClose={handleCloseFormCreate}/>
        </div>
    );
};

export default CreateExercise;