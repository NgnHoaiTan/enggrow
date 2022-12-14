import React from 'react';
import bgcourse from "../../images/bgcourse2.png"
import { GiWaterRecycling } from 'react-icons/gi'
import { TbRotateClockwise2 } from 'react-icons/tb'
import { FiWifi } from 'react-icons/fi'
import { MdPersonPin } from 'react-icons/md';
const Background = () => {
    return (
        <div className='w-full min-h-fit lg:h-[600px]  bg-gradient-to-r from-[#FFEFBA] to-[#FFFFaa] relative'>
            <div className="flex flex-col-reverse sm:flex-row justify-between pt-[56px] pb-[20px] sm:pb-14 md:pt-[60px] items-center">
                <div className="title-background px-4 sm:px-0 sm:pl-6 md:pl-20 w-full text-center sm:text-left sm:w-3/6">
                    <h2 className='w-full md:w-4/5 leading-tight font-bold md:font-semibold text-xl sm:text-2xl md:text-2xl md:leading-tight lg:text-5xl xl:text-6xl sm:leading-tight lg:leading-snug xl:leading-snug mb-2 sm:mb-4 text-[#444242]'>
                        English Pronunciation Learning
                    </h2>
                    <p className='text-sm md:text-lg w-full'>Flexible scheduling and self learning make it easier to fit studies into your busy life</p>
                </div>
                <div className='sm:w-3/6 relative sm:px-4'>
                    <img src={bgcourse} alt="bgcourse" className='w-full h-full object-cover drop-shadow-sm' />

                </div>

            </div>
            <div className="card-introduce w-full px-3 lg:px-0 full lg:w-3/4 relative sm:absolute sm:bottom-0 sm:translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
                <div className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-4 md:gap-5 pb-3 sm:pb-0">
                    <div className="card-item-introduce hover:-translate-y-1 ease-in-out duration-200 cursor-pointer flex flex-row bg-white sm:shadow-card max-h-fit rounded-lg py-3 px-5 sm:py-2 sm:px-4 md:px-3 md:py-4">
                        <div id="icon-card-introduce-course" className='w-14 sm:w-12 md:w-20 lg:w-20 mr-3 lg:mr-5'>
                            <FiWifi size="100%" color="blue" />
                        </div>
                        <div className='w-full md:w-auto '>
                            <p className='font-semibold text-base lg:text-lg text-left'>Access Online</p>
                            <p className='text-sm lg:text-base text-left'>Can study at home or in local libraries or at anywhere with internet</p>
                        </div>

                    </div>

                    <div className="card-item-introduce hover:-translate-y-1 ease-in-out duration-200 cursor-pointer flex flex-row bg-white sm:shadow-card max-h-fit rounded-lg py-3 px-5 sm:py-2 sm:px-4 md:px-3 md:py-4 my-3 sm:my-0">
                        <div id="icon-card-introduce-course" className='w-14 sm:w-12 md:w-20 lg:w-20 mr-3 lg:mr-5'>
                            <TbRotateClockwise2 size="100%" color="blue" />
                        </div>
                        <div className='w-full md:w-auto '>
                            <p className='font-semibold text-base lg:text-lg text-left'>Flexible Time</p>
                            <p className='text-sm lg:text-base text-left'>Study when and where suits you, and work at your own pace</p>
                        </div>

                    </div>

                    <div className="card-item-introduce hover:-translate-y-1 ease-in-out duration-200 cursor-pointer flex flex-row bg-white sm:shadow-card max-h-fit rounded-lg py-3 px-5 sm:py-2 sm:px-4 md:px-3 md:py-4">
                        <div id="icon-card-introduce-course" className='w-14 sm:w-12 md:w-20 lg:w-20 mr-3 lg:mr-5'>
                            <MdPersonPin size="100%" color="blue" />
                        </div>
                        <div className='w-full md:w-auto '>
                            <p className='font-semibold text-base lg:text-lg text-left'>Expert's instructor</p>
                            <p className='text-sm lg:text-base text-left'>Learn a new language with experienced teachers</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Background;