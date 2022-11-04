import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri';


const CardTeacher = () => {
    return (
        <div className='bg-white rounded-lg p-4 lg:py-8 relative hover:-translate-y-1 ease-in-out duration-500'>
            <div className="top-card flex justify-center items-center flex-col">
                <div className="avatar">
                    <img className='before:content-[" "] before:border-3 before:border-blue-400 w-28 h-28 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32  rounded-full object-cover border-[5px] border-violet-500' src="https://i.vietgiaitri.com/2019/9/5/nhung-album-us-uk-mai-chim-vao-lang-quen-va-1001-li-do-tro-treu-khong-the-phat-hanh-1861cc.jpg" alt='teacher' />
                </div>
                <div className='my-2 text-center'>
                    <p className='font-bold text-lg leading-tight'>Albert Monica</p>
                    <p className='font-semibold text-base text-gray-400'>English Teacher</p>
                </div>

                <div className="rating flex items-center">
                    <div>

                    </div>
                    <AiFillStar size="25px" color="#ffd900" />
                    <AiFillStar size="25px" color="#ffd900" />
                    <AiFillStar size="25px" color="#ffd900" />
                    <AiFillStar size="25px" color="#ffd900" />
                    <AiFillStar size="25px" color="#acacac" />
                </div>
            </div>
            <div className="content-card py-5 ">
                <div className="description relative">
                    <div className="main-desc sm:px-2 lg:px-5">
                        <p className='leading-tight text-center z-20'>
                            Execute lessons efficiently using different styles of teaching depending on the content.
                            Engage students to ensure a lively classroom atmosphere. Instruct students about the structure
                            and content of the English language. Teach students the spelling of words, and their meanings
                        </p>
                    </div>
                    <div className="top-quote absolute -top-5 -left-0 w-14 z-10 opacity-30">
                        <RiDoubleQuotesL size="100%" color='#acacac' />
                    </div>
                    <div className="bottom-quote absolute -bottom-5 right-0 w-14 z-10 opacity-30">
                        <RiDoubleQuotesR size="100%" color='#acacac' />
                    </div>

                </div>
                <div className="flex justify-center mt-5">
                    <button className='bg-blue-500 py-2 px-3 rounded-md text-white font-semibold'>See more</button>
                </div>

            </div>
        </div>
    );
};

export default CardTeacher;