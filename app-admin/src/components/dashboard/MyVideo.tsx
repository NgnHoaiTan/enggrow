import React from 'react';
import Video from './Video';

const MyVideo = () => {
    return (
        <div className='my-4'>
             <h2 className='font-bold text-lg mb-3'>My Videos Course</h2>
             <div className="grid grid-cols-2 gap-4 sm:gap-6  sm:grid-cols-3 lg:gap-6 md:grid-cols-4">
                <Video />
                <Video />
                <Video />
                <Video />
             </div>
        </div>
    );
};

export default MyVideo;