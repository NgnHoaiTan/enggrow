import React, { useState } from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoVolumeMediumOutline } from 'react-icons/io5'
import { BiEdit } from 'react-icons/bi'
import './Card.css'
import EditModel from './EditModel';
const Card = () => {
    const [turn, setTurn] = useState(false)
    const [frontFace, setfrontFace] = useState(true)
    const [showModelEdit, setShowModelEdit] = useState(false)

    const handleCloseEdit = () => {
        setShowModelEdit(false)
    }
    const handleFlipCard = (e: React.MouseEvent<HTMLElement>) => {
        setTurn(!turn)
        setfrontFace(!frontFace)
    }
    const handleShowEdit = (e: React.MouseEvent<HTMLElement>) => {
        setShowModelEdit(true)
        e.stopPropagation()
    }

    const handleSound = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        console.log('sound on')
    }
    return (
        <div className='relative p-10'>
            {/* <div className={`${frontFace ? 'visible' : 'invisible'} ease-in-out duration-100 absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-3 cursor-pointer z-50 w-7 h-7 md:w-7 md:h-7 hover:bg-gray-200 rounded-full bg-transparent p-1`}>
                <AiTwotoneSound size="100%" color='gray' />
            </div> */}
            <div
                onClick={(e) => handleFlipCard(e)}
                className={`card${turn ? ' is-flip' : ''} flex justify-center items-center cursor-pointer bg-gradient-to-br from-[#abd699] to-[#299fa3] rounded-xl p-2 md:p-3 w-full h-52 relative`}>

                <div className="card-front w-full h-full py-2 px-5">
                    <div className="top-card flex justify-between items-center">
                        <div className='w-4 md:w-5'>
                            <GoPrimitiveDot size="100%" color="#ffffff" />
                        </div>
                        <div className="index-of-card">
                            <p className='text-white text-center text-base'>1/5</p>
                        </div>
                        <div onClick={(e) => handleShowEdit(e)} className="edit w-6 h-6 md:w-7 md:h-7 hover:bg-gray-300 rounded-full p-1 z-50">
                            <BiEdit size="100%" color="#ffffff" />
                        </div>
                    </div>
                    <div className="content-card absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center flex-col justify-center">
                        <p className='text-white text-center font-semibold text-2xl mb-2'>Activity</p>
                        <div onClick={(e) => handleSound(e)} className={`cursor-pointer z-50 w-7 h-7 md:w-7 md:h-7 hover:bg-[#06296f] rounded-full bg-transparent p-1`}>
                            <IoVolumeMediumOutline size="100%" color='#fdfdfd' />


                        </div>
                    </div>
                </div>
                <div className="card-back w-full h-full py-2 px-5">
                    <div className="top-card flex justify-between items-center">
                        <div className='w-4 md:w-5'>
                            <GoPrimitiveDot size="100%" color="#ffffff" />
                        </div>
                        <div className="index-of-card">
                            <p className='text-white text-center text-base'>1/5</p>
                        </div>
                        <div onClick={(e) => handleShowEdit(e)} className="edit w-6 h-6 md:w-7 md:h-7 hover:bg-gray-300 rounded-full p-1 z-50">
                            <BiEdit size="100%" color="#ffffff" />
                        </div>
                    </div>
                    <div className="content-card absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  flex items-center flex-col justify-center">
                        <p className='text-white text-center text-2xl'>
                            Hoạt động (noun)
                        </p>
                    </div>
                </div>



            </div>
            {/* <EditModel showModelEdit={showModelEdit} onClose={handleCloseEdit} /> */}
        </div>


    );
};

export default Card;