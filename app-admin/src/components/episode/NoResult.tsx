import React from 'react';
import { lookfor, picturePlanet } from '../../common/Image';

interface resultProps {
    message: string
}
const NoResult = (props: resultProps) => {
    return (
        <div className='flex justify-center'>
            <div className="relative">
                <img src={picturePlanet} alt="planet" className='mx-auto w-40 h-40 rounded-full object-cover'/>
                <p className='font-semibold text-xl text-[#636363] text-center mt-5'>
                    {props.message}
                </p>
                <div className="absolute top-1/3 left-3/4 -translate-x-full w-24">
                    <img src={lookfor} alt="look for" className='w-full'/>
                </div>
            </div>


        </div>
    );
};

export default NoResult;