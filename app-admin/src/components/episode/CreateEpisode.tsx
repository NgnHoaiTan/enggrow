import React, {useState} from 'react';
import CreateModel from './CreateModel';

const CreateEpisode = () => {
    const [showFormCreate, setShowFormCreate] = useState(false)
    const onCloseFormCreate = () => {
        setShowFormCreate(false)
    }
    return (
        <div className='my-5 flex justify-center '>
            <button 
            onClick={()=>setShowFormCreate(true)}
            className='px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg font-semibold text-white bg-blue-500'>
                Tạo bài học
            </button>
            <CreateModel showFormCreate={showFormCreate} onClose={onCloseFormCreate}/>
        </div>
    );
};

export default CreateEpisode;