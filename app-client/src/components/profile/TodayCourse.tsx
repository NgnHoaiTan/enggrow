import React from 'react';
import democourse from '../../images/democourse.jpg'
const TodayCourse = () => {
    return (
        <div className="today-course-item bg-gray-100 rounded-lg flex items-start p-3 mb-3 last:mb-0">
                            <div className="img-part mr-3">
                                <img src={democourse} alt="other course" className='w-56 h-full object-cover rounded-md' />
                            </div>
                            <div className="content-part">
                                <h3 className='font-semibold text-base'>Pronunciation of American English</h3>
                                <p className='text-sm text-gray-500'>Bringing American English pronunciation to the forefront, teaching you how to speak with an American accent.</p>
                                <p className='text-sm text-black'>Monday, September 26 2022 - 19h20</p>
                                <div className="flex justify-start mt-2">
                                    <button className='border-violet-500 border-[1px] py-[3px] px-3 rounded-md mr-3'>Skip</button>
                                    <button className='bg-violet-500 hover:bg-violet-600 text-white font-semibold py-1 px-3 rounded-md'>Remind me</button>
                                </div>
                            </div>
                        </div>
    );
};

export default TodayCourse;